const isProd = () => process.env.NODE_ENV === 'production';

const configs = {
  credentials: {
    google: {
      clientId: '1065733320727-893uf4dhps0dr2nrui3l1sdkidq321l7.apps.googleusercontent.com'
    }
  },
  services: {
    // TODO: take urls from ENV vars
    users: {
      url: isProd() ? 'http://34.120.200.151/users-service' : 'http://0.0.0.0:7001'
    },
    courses: {
      url: isProd() ? 'http://34.120.200.151/courses-service' : 'http://0.0.0.0:5001'
    },
    exercises: {
      url: isProd() ? 'http://34.120.200.151/exercises-service' : 'http://0.0.0.0:9000'
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
