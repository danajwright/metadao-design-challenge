"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProposalContent({ markdown }: { markdown: string }) {
  return (
    <div className="flex flex-col gap-6 items-start py-[18px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h3({ children, ...props }) {
            return (
              <div className="flex flex-col gap-1 items-start justify-center w-full">
                <h3
                  {...props}
                  className="font-semibold text-[16px] text-[#f4e4cf] leading-5 whitespace-nowrap"
                >
                  {children}
                </h3>
              </div>
            );
          },
          p({ children, ...props }) {
            return (
              <p
                {...props}
                className="text-[14px] text-[#a99986] leading-[22.75px] w-full"
              >
                {children}
              </p>
            );
          },
          strong({ children, ...props }) {
            return (
              <strong {...props} className="font-semibold text-[#f4e4cf]">
                {children}
              </strong>
            );
          },
          ul({ children, ...props }) {
            return (
              <ul {...props} className="flex flex-col gap-3 items-start w-full">
                {children}
              </ul>
            );
          },
          li({ children, ...props }) {
            return (
              <li
                {...props}
                className="text-[14px] text-[#a99986] leading-[22.75px] list-disc ml-5"
              >
                {children}
              </li>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol {...props} className="flex flex-col gap-3 items-start w-full">
                {children}
              </ol>
            );
          },
          a({ children, href, ...props }) {
            return (
              <a
                {...props}
                href={href}
                className="text-[#8aea92] hover:opacity-80 underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
