import React from "react";
import MarkdownRenderer from "../lib/MarkdownRenderer";

export default function Basics() {
    return (
        <main>
            <MarkdownRenderer filePath="/course-files/basics.md" />
        </main>
    );
}
