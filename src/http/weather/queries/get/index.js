import defaultResponse from "./default";
import presenter from "./presenter";
import { trackPromise } from "react-promise-tracker";

export default {
  default: defaultResponse,
  query: async ({ client, q }) => {
    const endpoint =
      client.endpoints.base +
      "?q=" +
      q +
      `&appid=${client.apiKey}&units=metric`;
    const response = await trackPromise(
      client
        .http({
          method: "get",
          url: endpoint,
          headers: client.shared.headers,
        })
        .catch((_) => defaultResponse)
    );

    if (response.isDefault) {
      return response;
    }

    const json = await response.data;
    return presenter({ json });
  },
};
