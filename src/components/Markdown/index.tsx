import React from 'react';
import marked from 'marked';

export interface MarkdownProps {
    content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
    return (
        <div dangerouslySetInnerHTML={{
            __html: marked(content)
        }} />
    )
}