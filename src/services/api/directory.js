import { apiV1 } from 'services/config'

const directory = {
  get: async ({
    directoryName,
    sortBy = 'dc:created',
    sortOrder = 'DESC',
    pageSize = 100,
  }) =>
    apiV1
      .get(
        `directory/${directoryName}?sortBy${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}`,
      )
      .json(),
}

export default directory
