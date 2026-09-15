export const megabyte = 1024 * 1024

export const maxMessageLength = 5000
export const maxEmailLength = 254
export const maxSubjectLength = 150

export const maxFileCount = 5
export const maxFileSizeBytes = 10 * megabyte
export const maxTotalSizeBytes = 15 * megabyte

export const rateLimitMaxRequests = 5
export const rateLimitWindowMs = 10 * 60 * 1000

export const blockedFileExtensions: string[] = [
  "ade",
  "adp",
  "apk",
  "appx",
  "appxbundle",
  "bat",
  "cab",
  "chm",
  "cmd",
  "com",
  "cpl",
  "diagcab",
  "diagcfg",
  "diagpack",
  "dll",
  "dmg",
  "docm",
  "dotm",
  "ex",
  "ex_",
  "exe",
  "hta",
  "htm",
  "html",
  "img",
  "ins",
  "iso",
  "isp",
  "jar",
  "jnlp",
  "js",
  "jse",
  "lib",
  "lnk",
  "mde",
  "msc",
  "msi",
  "msix",
  "msixbundle",
  "msp",
  "mst",
  "nsh",
  "pif",
  "pptm",
  "ps1",
  "reg",
  "scr",
  "sct",
  "shb",
  "svg",
  "sys",
  "url",
  "vb",
  "vbe",
  "vbs",
  "vhd",
  "vxd",
  "wsc",
  "wsf",
  "wsh",
  "xll",
  "xlsm"
]
