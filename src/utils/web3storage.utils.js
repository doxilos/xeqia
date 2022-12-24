import {Web3Storage} from "web3.storage"

function makeStorageClient () {
   return new Web3Storage({
      token: process.env.REACT_APP_WEB3STORAGE_API_TOKEN
   })
}

export async function storeFiles(files) {
   const client = makeStorageClient()
   return await client.put(files)
}
