import { api } from 'services/config'

const directory = {
  get: async ({
    directoryName,
    sortBy = 'dc:created',
    sortOrder = 'DESC',
    pageSize = 100,
  }) =>
    api
      .get(
        `directory/${directoryName}?sortBy${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}`,
      )
      .json(),
}

export default directory
