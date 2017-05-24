const timeoutPromise = (value, duration) => new Promise(resolve => setTimeout(() => resolve(value), duration))

export default [
    {
        label: "Vegetables",
        items: [
            { label: "Potato" },
            { label: "Carrot" },
            { label: "Tomato" }
        ]
    },
    {
        label: "Fruits",
        items: [
            { label: "Orange" },
            { label: "Watermelon" },
            { label: "Banana" },
            { label: "Kumquat" },
            { label: "Strawberry" },
            { label: "Raspberry" },
            { label: "Cherry" }
        ]
    },
    {
        label: "Animals",
        items: [
            {
                label: "Mammals",
                items: [
                    { label: "Tiger" },
                    { label: "Platypus" },
                    { label: "Bear" }
                ]
            },
            {
                label: "Reptiles",
                items: [
                    { label: "Turtle" },
                    { label: "Crocodile" }
                ]
            },
            {
                label: "Insects",
                items: [
                    { label: "Bee" },
                    { label: "Fly" },
                    { label: "Ant" }
                ]
            }
        ]
    },
    {
        label: "Durations",
        items: () => timeoutPromise([
            { label: "0.5 second",  items: () => timeoutPromise([{ label: "Brief" }], 500) },
            { label: "2 seconds",   items: () => timeoutPromise([{ label: "Enduring" }], 2000) },
            { label: "4 seconds",   items: () => timeoutPromise([{ label: "Everlasting" }], 4000) }
        ], 1000)
    }
]