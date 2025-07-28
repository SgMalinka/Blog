export const blogData = [
    {
        id: 'post1',
        title: 'Your portfolio is stopping you from getting that job',
        content:
            'Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolio was lacking real-world projects, I decided to give it a shot...',
        createdAt: '2025-07-22T10:30:00Z',
        author: {
            name: 'Amit Das',
            photoURL: 'https://i.pravatar.cc/150?img=11',
            uid: 'user_amit',
        },
        comments: [
            {
                id: 'comment1',
                userName: 'Max',
                userImage: 'https://i.pravatar.cc/150?img=13',
                text: 'This really hit home. Thanks for sharing!',
                createdAt: '2025-07-25T11:00:00Z',
            },
        ],
    },
    {
        id: 'post2',
        title: 'Designing for Impact: Lessons from Real Users',
        content:
            'When we design, we often think of ideal scenarios. But reality is messy. Here are 5 hard-earned lessons I learned working with real users in a healthcare app redesign...',
        createdAt: '2025-07-20T14:10:00Z',
        author: {
            name: 'Sophie Lee',
            photoURL: 'https://i.pravatar.cc/150?img=19',
            uid: 'user_sophie',
        },
        comments: [
            {
                id: 'comment2',
                userName: 'John',
                userImage: 'https://i.pravatar.cc/150?img=15',
                text: 'Great insight about onboarding screens!',
                createdAt: '2025-07-21T09:15:00Z',
            },
            {
                id: 'comment3',
                userName: 'Ella',
                userImage: 'https://i.pravatar.cc/150?img=31',
                text: 'Totally agree. Real feedback changes everything.',
                createdAt: '2025-07-21T10:42:00Z',
            },
        ],
    },
    {
        id: 'post3',
        title: 'Building Your Personal Brand as a Developer',
        content:
            'It’s not just about writing code — it’s about storytelling, showing your values, and being visible. In this post, I share the roadmap that helped me land my first full-time dev role...',
        createdAt: '2025-07-15T08:00:00Z',
        author: {
            name: 'Carlos Mendes',
            photoURL: 'https://i.pravatar.cc/150?img=14',
            uid: 'user_carlos',
        },
        comments: [],
    },
];
