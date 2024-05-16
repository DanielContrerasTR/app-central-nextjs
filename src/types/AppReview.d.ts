export interface AppReview {
    user: string;
    rating: number;
    date: string;
    review: string;
}

export interface ReviewsChartData {
    rating: number;
    review: number;
}