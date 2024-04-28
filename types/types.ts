export interface Post {
    _id: string;
    creator: {
        username: string;
        email: string;
        image: string;
        _id: string;
    };
    description: string;
    tag: string;
    imageUrl: string;
    // fileUrl: string;
}