import { v4 } from "uuid"

export class Idgenerator {
   public generateId = (): string => {
      return v4()
   }
}