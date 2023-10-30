const isProd = () => process.env.NODE_ENV === 'production';

const configs = {
  credentials: {
    google: {
      clientId: '335642806033-84755oo8q5bgurnq79rtog88njbatobd.apps.googleusercontent.com'
    }
  },
  services: {
    // TODO: take urls from ENV vars
    users: {
      url: isProd() ? 'https://users-service-fiuba-lorenzolgz.cloud.okteto.net' : 'http://0.0.0.0:7000'
    },
    courses: {
      url: isProd() ? 'https://courses-service-fiuba-lorenzolgz.cloud.okteto.net' : 'http://0.0.0.0:5001'
    },
    exercises: {
      url: isProd() ? 'https://exercises-service-fiuba-lorenzolgz.cloud.okteto.net' : 'http://0.0.0.0:9000'
    }
  },
  paths: {
    main: '/',
    courses: '/courses',
    coursesSearch: '/courses/search',
    courseGuide: '/courses/:courseId/guides/:guideId',
    course: '/courses/:courseId',
    statistics: '/statistics'
  },
  pathGenerators: {
    course: (courseId) => `/courses/${courseId}`,
    exercise: ({ courseId, guideId, exerciseId }) => `/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`,
    userExercise: ({ courseId, guideId, exerciseId, userId }) => `/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}?userId=${userId}`,
    courseGuide: (courseId, guideId) => `/courses/${courseId}/guides/${guideId}`,
    createExerciseGuide: (courseId, guideId) => `/courses/${courseId}/guides/${guideId}/create-exercise`,
    courseUserGuide: (courseId, guideId, userId) => (
      userId
        ? `/courses/${courseId}/guides/${guideId}?userId=${userId}`
        : `/courses/${courseId}/guides/${guideId}`
    ),
    courseUsers: (courseId) => `/courses/${courseId}/users`,
    courseStatistics: (courseId) => `/courses/${courseId}/statistics`
  }
};

module.exports = configs;
