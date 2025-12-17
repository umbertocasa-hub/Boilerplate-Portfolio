export type Photo = {
    id: string;
    url: string;
    caption: string;
    createdAt: string;
    type?: 'image' | 'video';
    mimeType?: string;
    category?: string;
    tags?: string[];
};

export type Project = {
    id: string;
    title: string;
    description: string;
    link?: string;
    imageUrl?: string;
    category?: string;
    tags: string[];
    createdAt: string;
};
