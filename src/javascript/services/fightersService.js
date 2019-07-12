import { callApi } from "../helpers/apiHelper";

class FightersService {
  async getFighters() {
    try {
      const endpoint = "user/";
      const apiResult = await callApi(endpoint, "GET");
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id) {
    try {
      const endpoint = `user/${_id}`;
      const apiResult = await callApi(endpoint, "GET");
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async updateFighterDetailsInMap(_id, fighterDetailsMap) {
    try {
      const fighterDetails = await fightersService.getFighterDetails(_id);
      if (!fighterDetailsMap.get(_id)) {
        fighterDetailsMap.set(_id, fighterDetails);
      }
      return fighterDetails;
    } catch (error) {
      throw error;
    }
  }

  async updateFighterDetailsOnServer(_id, fighter) {
    try {
      const body = JSON.stringify(fighter);
      const apiResult = await callApi(`user/${_id}`, "PUT", body);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async postFight(fightResult) {
    try {
      const endpoint = "fight/";
      const body = JSON.stringify(fightResult);
      const apiResult = await callApi(endpoint, "POST", body);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }  
}

export const fightersService = new FightersService();
