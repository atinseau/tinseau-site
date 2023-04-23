import Drive, { LocalDriverConfig } from '@ioc:Adonis/Core/Drive'

const getBasePath = () => {
  const localDriver = Drive.use('local')
  const config =  (localDriver as unknown as { config: LocalDriverConfig }).config
  const basePath = config.basePath
  return basePath as string
}

const getFileUrl = (filePath: string) => {
  return getBasePath() + filePath
}

export {
  getBasePath,
  getFileUrl
}