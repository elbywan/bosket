
<template>

    <div class="ComponentDemo section">
        <h3 v-if="componentName">{{ componentName }}</h3>
        <p v-if="description"> {{ description }}</p>
        <div class="ComponentDemo flex-container" :class="{ expanded: expand }">
            <div class="ComponentDemo demo-area" :class="{ expand: expand === 'demo' }">
                <!-- Expand button -->
                <div class="ComponentDemo expander" @click="expand = expand === 'demo' ? '' : 'demo'">
                    <i class="fa" :class="{
                        'fa-compress':  expand === 'demo',
                        'fa-expand':    expand !== 'demo'
                    }"></i>
                </div>
                <!-- Demo content -->
                <div class="ComponentDemo padded">
                    <slot></slot>
                </div>
            </div>
            <div v-if="files && files.length > 0" class="ComponentDemo code" :class="{ expand: expand === 'code' }">
                <!-- Expand button -->
                <div class="ComponentDemo expander" @click="expand = expand === 'code' ? '' : 'code'">
                    <i class="fa" :class="{
                        'fa-compress':  expand === 'code',
                        'fa-expand':    expand !== 'code'
                    }"></i>
                </div>
                <!-- Code files tabs -->
                <div class="tabs">
                    <div v-for="f in files" @click="tab = f" :class="{ selected: tab === f }">
                        {{ getFileName(f) }}
                    </div>
                </div>
                <!-- Code files content -->
                <pre :class="'language-' + getPrismExtension(tab)"><code :class="'language-' + getPrismExtension(tab)" ref="tabContents"></code></pre>
            </div>
        </div>
    </div>

</template>

<script>
    import "self/common/styles/ComponentDemo.css"

    import { loadFile } from "self/common/tools"
    import Prism from "self/common/libs/prismjs/prism"

    export default {
        props: [ "componentName", "description", "files" ],
        data: () => ({
            expand: "demo",
            _tab: ""
        }),
        computed: {
            tab: {
                get: function() {
                    return this.$data._tab || (this.files && this.files.length > 0 ? this.files[0] : null)
                },
                set: function(file) {
                    this.$data._tab = file
                    this.refresh()
                }
            }
        },
        methods: {
            getFileName(file) {
                return file.split("/").splice(-1).join("")
            },
            getPrismExtension(file) {
                if(!file) return ""
                const split = file.split(".")
                let extension = "javascript"
                if(split[split.length - 1] === "css")
                    extension = "css"
                else if(split[split.length - 1] === "ts")
                    extension = "typescript"
                return extension
            },
            refresh() {
                const file = this.tab
                loadFile(file, code => {
                    if(this.$refs.tabContents)
                        this.$refs.tabContents.innerHTML = Prism.highlight(code, Prism.languages[this.getPrismExtension(file)])
                })
            }
        },
        created: function() {
            this.refresh()
        }
    }

</script>
