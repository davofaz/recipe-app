export interface Recipe {
    readyInMinutes: number;
    sourceUrl: string;
    image: string;
    servings: number;
    id: number;
    title: string;
}

export interface RecipeInfoProps {
    recipe: Recipe;
    bookmarks: Bookmark[];
    onToggleBookmark: (updatedBookmarks: Bookmark[]) => void;
}

export interface Bookmark  {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    sourceUrl: string,
};