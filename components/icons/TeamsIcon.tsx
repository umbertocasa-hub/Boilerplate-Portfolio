import React from "react";

export const TeamsIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.5 13H22.5V8H17.5V13ZM16.5 7H23.5V14H16.5V7ZM10.5 8H15.5V13H10.5V8ZM9.5 7H16.5V14H9.5V7ZM4.5 8H8.5V13H4.5V8ZM3.5 7H9.5V14H3.5V7Z" fill="none" opacity="0" />
        <path
            d="M9.50001 7.50001L16.5 7V14L9.50001 13.5V7.50001Z"
            fill="#5059C9"
        />
        <path
            d="M17.5 13H22.5V8H17.5V13Z"
            fill="#5059C9"
        />
        <path
            d="M4.50001 8L8.50001 8.00001V13L4.50001 13V8Z"
            fill="#5059C9"
        />
        <path
            d="M23 6L15 7.5L14.5 21L23 18V6Z"
            fill="#7B83EB"
        />
        <path
            d="M14.5 3L2 6V18L14.5 21V3Z"
            fill="#5059C9"
        />
        <path
            d="M19.5 8.5C19.5 9.328 18.828 10 18 10C17.172 10 16.5 9.328 16.5 8.5C16.5 7.672 17.172 7 18 7C18.828 7 19.5 7.672 19.5 8.5Z"
            fill="white"
        />
        <path
            d="M21 16H20.307C20.077 16 19.863 15.895 19.724 15.712C19.389 15.272 18.783 14.5 18 14.5C17.217 14.5 16.611 15.272 16.276 15.712C16.137 15.895 15.923 16 15.693 16H15.001L15 17H21V16Z"
            fill="white"
        />
        <path
            d="M6.5 9.5C6.5 10.605 7.395 11.5 8.5 11.5C9.605 11.5 10.5 10.605 10.5 9.5C10.5 8.395 9.605 7.5 8.5 7.5C7.395 7.5 6.5 8.395 6.5 9.5Z"
            fill="white"
        />
        <path
            d="M10.5 17.5H9.721C9.376 17.5 9.065 17.301 8.904 16.993C8.514 16.243 7.637 15.5 6.5 15.5C5.363 15.5 4.486 16.243 4.096 16.993C3.935 17.301 3.624 17.5 3.279 17.5H2.5V18.5H10.5V17.5Z"
            fill="white"
        />
        {/* T letter on the blue side */}
        <path d="M5.5 10.5H11.5V12.5H9.5V19.5H7.5V12.5H5.5V10.5Z" fill="white" />
    </svg>
);
