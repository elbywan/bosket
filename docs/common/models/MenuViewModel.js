export default [
    { name: "Account", icon: "fa-user-circle", menu: [
        { name: "Preferences", icon: "fa-cogs", menu: [
            { name: "Notifications", icon: "fa-envelope" },
            { name: "Display", icon: "fa-desktop" },
            { name: "General", icon: "fa-ellipsis-h" }
        ]},
        { name: "Authorizations", icon: "fa-key" },
        { name: "Sign out", icon: "fa-sign-out" }
    ]},
    { name: "Reservations", icon: "fa-book" },
    { name: "Calendar", icon: "fa-calendar" },
    { name: "Privacy", icon: "fa-eye", menu: [
        { name: "Confidentiality", icon: "fa-user-secret" },
        { name: "Network", icon: "fa-plug", menu: [
            { name: "Cookies", icon: "fa-birthday-cake" },
            { name: "Security", icon: "fa-lock" },
            { name: "Firewall", icon: "fa-fire" }
        ]},
        { name: "Blocking", icon: "fa-ban" }
    ]}
]