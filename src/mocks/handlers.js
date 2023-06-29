import { rest } from 'msw';

export const handlers = [
    rest.get('https://api.fake-rest/complexSearch', (req, res, ctx) => {
        const { query } = req.url.searchParams;

        // Define your mock response
        const mockData = {
            results: [
                // Define your mock data here
                { id: 637876, title: 'Chicken 65' },
                { id: 716342, title: 'Chicken Suya' },
            ],
        };

        console.log('Mock Data:', mockData);

        if (query === 'success') {
            return res(
                ctx.json(mockData),
                ctx.status(200)
            );
        } else if (query === 'forbidden') {
            return res(
                ctx.status(403),
                ctx.json({ error: 'Forbidden' })
            );
        } else {
            return res(
                ctx.status(404),
                ctx.json({ error: 'Not Found' })
            );
        }
    }),
];
