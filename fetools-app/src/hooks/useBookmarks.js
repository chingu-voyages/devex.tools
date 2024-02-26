import { useEffect, useState } from "react";

export default function useBookmarks(toolState, pageName) {
    // Initialize bookmark state
    const [isBookmarked, setIsBookmarked] = useState(
        itemIsBookmarked(toolState, retrieveLocalBookmarks(pageName))
    );

    const [bookmarks, setBookmarks] = useState(
        retrieveLocalBookmarks(pageName)
    );

    // Update bookmark state when toolState changes
    useEffect(() => {
        setIsBookmarked(
            itemIsBookmarked(toolState, retrieveLocalBookmarks(pageName))
        );
    }, [toolState, pageName]);

    function toggleBookmark(isBookmarked, toolState) {
        console.log("toggleBookmark", isBookmarked, toolState);
        setBookmarks(retrieveLocalBookmarks(pageName));
        console.log(bookmarks);
        isBookmarked
            ? removeBookmark(toolState, bookmarks)
            : bookmarkItem(toolState, bookmarks);
    }

    function retrieveLocalBookmarks(pageName) {
        return JSON.parse(
            localStorage.getItem(`${pageName}-bookmarks`) || "[]"
        );
    }

    function removeBookmark(toolState, bookmarks) {
        console.log("removeBookmark");
        const newBookmarks = bookmarks.filter(
            (item) => !compareItems(item, toolState)
        );
        localStorage.setItem(
            `${pageName}-bookmarks`,
            JSON.stringify(newBookmarks)
        );
        setBookmarks(newBookmarks);
        setIsBookmarked(false);
    }

    function bookmarkItem(toolState) {
        localStorage.setItem(
            `${pageName}-bookmarks`,
            JSON.stringify([...bookmarks, toolState])
        );
        setBookmarks(retrieveLocalBookmarks(pageName));
        setIsBookmarked(true);
    }

    function itemIsBookmarked(item, bookmarks) {
        if (typeof item === "object") {
            console.log("object", item, bookmarks);
            for (let i = 0; i < bookmarks.length; i++) {
                if (compareItems(item, bookmarks[i])) {
                    return true;
                }
            }
            console.log("returning false");
            return false;
        } else {
            console.log("not object", item, bookmarks);
            return bookmarks.includes(item);
        }
    }

    function compareItems(a, b) {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (Object.keys(a).length !== Object.keys(b).length) return false;
        for (let key in a)
            if (typeof a[key] === "object") {
                if (!compareItems(a[key], b[key])) return false;
            } else if (a[key] !== b[key]) return false;
        return true;
    }

    return [isBookmarked, bookmarks, toggleBookmark, removeBookmark];
}
