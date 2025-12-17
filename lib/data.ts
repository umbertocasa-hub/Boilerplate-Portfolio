import { db } from './db';
import { photos, projects } from './schema';
import { Photo as PhotoType, Project as ProjectType } from './types';
import { desc, eq } from 'drizzle-orm';

export async function getPhotos(): Promise<PhotoType[]> {
    const result = await db.select().from(photos).orderBy(desc(photos.createdAt));
    return result.map(p => ({
        id: p.id,
        url: p.url,
        caption: p.caption || "",
        tags: p.tags || [],
        category: p.category || undefined,
        mimeType: p.mimeType || undefined,
        type: (p.type as 'image' | 'video' | undefined) || 'image',
        createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString()
    }));
}

export async function getProjects(): Promise<ProjectType[]> {
    const result = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return result.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        link: p.link || undefined,
        imageUrl: p.imageUrl || undefined,
        category: p.category || undefined,
        tags: p.tags || [],
        createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString()
    }));
}

export async function addPhoto(photo: PhotoType): Promise<void> {
    await db.insert(photos).values({
        id: photo.id,
        url: photo.url,
        caption: photo.caption,
        tags: photo.tags,
        category: photo.category,
        mimeType: photo.mimeType,
        type: photo.type,
        createdAt: new Date(photo.createdAt || Date.now()),
    });
}

export async function addProject(project: ProjectType): Promise<void> {
    await db.insert(projects).values({
        id: project.id,
        title: project.title,
        description: project.description,
        link: project.link,
        tags: project.tags,
        category: project.category,
        imageUrl: project.imageUrl,
        createdAt: new Date(project.createdAt || Date.now()),
    });
}

export async function deletePhoto(id: string): Promise<void> {
    await db.delete(photos).where(eq(photos.id, id));
}

export async function deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
}

export async function updatePhoto(updatedPhoto: PhotoType): Promise<void> {
    await db.update(photos).set({
        caption: updatedPhoto.caption,
        category: updatedPhoto.category,
        tags: updatedPhoto.tags,
    }).where(eq(photos.id, updatedPhoto.id));
}
