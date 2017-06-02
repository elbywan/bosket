import React from "react"

const helpers = {
     // Render a nice table to display folder contents //
    renderFolderView: function() {
        const header =
            <thead>
                <tr><th>Name</th><th>Ext</th><th>Size</th></tr>
            </thead>
        const line = file => {
            const splittedName = file.filename.split(".")
            return (
                <tr className={ this.state.selection.indexOf(file) >= 0 ? "selected" : null }
                        onClick={ event => this.setState({ selection: [file]}) } key={ file.filename }>
                    <td>
                        <i className={"icon fa " + helpers.getIcon(file)}></i>
                        { splittedName.length === 1 ? file.filename : splittedName.slice(0, -1).join(".") }
                    </td>
                    <td>{ splittedName.length === 1 ? "" : splittedName[splittedName.length - 1] }</td>
                    <td>{ file.size }</td>
                </tr>
            )
        }

        return (
            <table>
                { header }
                <tbody>
                    { this.state.lastFolder ? this.state.lastFolder.files.map(line) : null }
                </tbody>
            </table>
        )
    },
    getIcon: function(item) {
        if(item.files) return "fa-folder-o"
        const split = item.filename.split(".")
        if(split.length === 1)
            return "fa-file-o"
        else {
            switch (split[split.length - 1].toLowerCase()) {
                case "txt":
                    return "fa-file-text-o"
                case "pdf":
                    return "fa-file-pdf-o"
                case "doc":
                    return "fa-file-word-o"
                case "jpg":
                    return "fa-file-image-o"
                case "png":
                    return "fa-file-image-o"
                case "mp4":
                    return "fa-file-video-o"
                default:
                    return "fa-file-o"
            }
        }
    },
    scanFiles: function(item, model = [], depth = 0) {
        const fileItem = {
            filename: item.name,
            size: 0,
            fsEntry: item
        }
        if(item.isDirectory) {
            fileItem.files = []
            const directoryReader = item.createReader()
            directoryReader.readEntries(entries => {
                entries.forEach(entry => {
                    helpers.scanFiles(entry, fileItem.files, depth + 1)
                })
            })
        }
        if(depth < 2) {
            fileItem.fsEntry.getMetadata &&
                    fileItem.fsEntry.getMetadata(metadata =>
                        fileItem.size = metadata.size)
            delete fileItem.fsEntry
        }

        model.push(fileItem)
        return fileItem
    },
    getFilesSize: function(item) {
        item.files.forEach(item => {
            if(item.fsEntry) {
                item.fsEntry.getMetadata &&
                    item.fsEntry.getMetadata(metadata =>
                        item.size = metadata.size)
                delete item.fsEntry
            }
        })
    }
}

export default helpers