"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProposalContent({ markdown }: { markdown: string }) {
  return (
    <div className="flex flex-col gap-[7px] items-start py-[16px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h3({ children, ...props }) {
            return (
              <div className="flex flex-col gap-1 items-start justify-center w-full mt-[18px] first:mt-0">
                <h3
                  {...props}
                  className="font-semibold text-[13px] text-[#f4e4cf] leading-[18px] whitespace-nowrap"
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
                className="text-[11px] text-[#a99986] leading-[20px] w-full"
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
              <ul {...props} className="flex flex-col gap-[11px] items-start w-full">
                {children}
              </ul>
            );
          },
          li({ children, ...props }) {
            return (
              <li
                {...props}
                className="text-[11px] text-[#a99986] leading-[20px] list-disc ml-[18px]"
              >
                {children}
              </li>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol {...props} className="flex flex-col gap-[11px] items-start w-full">
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
