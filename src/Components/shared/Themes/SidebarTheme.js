const SidebarTheme =  ({baseWidth = "w-64", centerItems=false}={}) => {
    return ({
        root: {
            base: "h-full border-r  ",
            collapsed: {
                on: "w-16",
                off: baseWidth
            },
            inner: "h-full overflow-y-auto overflow-x-hidden "
        },

        itemGroup: {
            base: `h-full space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700  ` ,
        },
        item: {
            base: `flex gap-3 w-full  items-center justify-start border-gray-50 rounded-lg p-2 border  bg-none text-blue-700 shadow-none hover:border-blue-600 relative transition-colors duration-200 ease-in-out hover:text-blue-700 ${centerItems === true ? "justify-center items-center" : ""} `,
            active: "text-white w-full hover:text-white bg-gradient-to-br from-blue-600 to-violet-600 border-0 hover:from-blue-600 hover:to-violet-600 transition-[background-position] duration-[250ms] ease-out bg-[length:200%_200%] bg-[position:50%_50%] hover:bg-[position:100%_100%]",
            collapsed: {
                insideCollapse: "",
                noIcon: "font-bold"
            },
            content: {
                base: "overflow-hidden flex gap-3 items-center"
            },
            icon: {
                base: "h-6 w-6 flex-shrink-0 text-blue-700",
                active: "text-white"
            }
        }
    });
}

export default SidebarTheme