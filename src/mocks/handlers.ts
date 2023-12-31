import { rest } from 'msw';

export const handlers = [
    
    rest.get('https://api.spoonacular.com/recipes/search', (req, res, ctx) => {

        const mockData = {
            results: [
                {
                    readyInMinutes: 45,
                    sourceUrl: 'https://www.foodista.com/recipe/FL3QKDTP/beans-hawaiian',
                    image: 'Beans-Hawaiian-634545.jpg',
                    servings: 8,
                    id: 634545,
                    title: 'Beans Hawaiian'
                },

            ]
        }

        //console.log('Mock Data from handlers:', mockData.results);

        return res(
            ctx.status(200),
            ctx.json(mockData)
        );
    }),

];
