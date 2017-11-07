#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const handlebars = require("handlebars")

const rootPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json")))

const extractDeps = (...deps) => {
    const obj = {}
    deps.forEach(d => obj[d] = rootPackage.devDependencies[d])
    return obj
}

const modules = [
    {
        name: "core",
        esm: true,
        peers: {
            "@bosket/tools": "^" + rootPackage.version
        }
    },
    {
        name: "tools",
        esm: true
    },
    {
        name: "angular",
        esm: true,
        peers: {
            "@bosket/core":  "^" + rootPackage.version,
            "@bosket/tools": "^" + rootPackage.version,
            ...extractDeps("@angular/core", "@angular/common")
        }
    },
    {
        name: "react",
        esm: true,
        peers: {
            "@bosket/core":  "^" + rootPackage.version,
            "@bosket/tools": "^" + rootPackage.version,
            ...extractDeps("react", "react-dom", "react-transition-group")
        }
    },
    {
        name: "riot",
        peers: {
            "@bosket/core":  "^" + rootPackage.version,
            "@bosket/tools": "^" + rootPackage.version,
            ...extractDeps("riot")
        }
    },
    {
        name: "vue",
        esm: true,
        peers: {
            "@bosket/core":  "^" + rootPackage.version,
            "@bosket/tools": "^" + rootPackage.version,
            ...extractDeps("vue")
        }
    }
]

const { pack, readme } = {
    pack:   handlebars.compile(fs.readFileSync(path.resolve(__dirname, "..", "build/package.json.hbs")).toString()),
    readme: handlebars.compile(fs.readFileSync(path.resolve(__dirname, "..", "build/README.md.hbs")).toString())
}

modules.forEach(m => {
    const data = { module: m.name, esm: m.esm, peers: m.peers, version: rootPackage.version }
    const prefix = path.resolve(__dirname, "..", "build", m.name)
    fs.writeFileSync(prefix + "/package.json", pack(data))
    fs.writeFileSync(prefix + "/README.md", readme(data))
})
