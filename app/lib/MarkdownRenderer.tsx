"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
    filePath: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ filePath }) => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(filePath);
                const text = await response.text();
                setMarkdown(text);
            } catch (error) {
                console.error("Error loading Markdown file:", error);
            }
        };

        fetchMarkdown();
    }, [filePath]);

    return (
        <ReactMarkdown
            children={markdown}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    );
                },
            }}
        />
    );
};

export default MarkdownRenderer;
