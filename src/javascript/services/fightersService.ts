import { callApi } from "../helpers/apiHelper";
import IFighter from "../models/fighter";

class FightersService {
  async getFighters(): Promise<IFighter[]> {
    try {
      const endpoint: string = "user/";
      const apiResult: IFighter[] = await callApi(endpoint, "GET") as IFighter[];
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id: string | number): Promise<IFighter> {
    try {
      const endpoint: string = `user/${_id}`;
      const apiResult: IFighter = await callApi(endpoint, "GET");
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async updateFighterDetailsInMap(_id: string | number, fighterDetailsMap: Map<string, IFighter>): Promise<IFighter> {
    try {
      const fighterDetails: IFighter = await fightersService.getFighterDetails(_id);
      if (!fighterDetailsMap.get(_id.toString())) {
        fighterDetailsMap.set(_id.toString(), fighterDetails);
      }
      return fighterDetails;
    } catch (error) {
      throw error;
    }
  }
 
}

export const fightersService = new FightersService();
