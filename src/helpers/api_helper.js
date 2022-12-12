import axios from "axios"

const axiosApi = axios.create({
  baseURL: "http://locahost:8080",
})

axiosApi.defaults.headers.common["Content-Type"] = "application/json"



// axiosApi.interceptors.request.use(
//   config => {
//       if(config.addToken === true)
//       {
//         let token = 'H4sIAAAAAAAA/yTQ1/KyOhQF8CfyG0KVS6VoIgnSCTcOTSE0C9Ke/oz/c7/X2r9Z5Yqq7JTXdo28YIOA1PADe1fKNSjD5hmHGlL/lSvq0hhthal+aQRayIY64MO16FqWePADu6XKBfeedeaYeL9g+KUR+iQRaLPeeYSnsMr+7sKRRu3nl3eN5U4YMpzAPDoc3Nwm4F3DmTFrNazj2W3o7JyKT8ajKtMklglotnpS5dqvxwTJD9iRKefBlK9/3eIPjX0q2H4wkw0DW5vrtHefv3/EdxY7cuvEhyPZjhX2OI5uZmdFBqA8HKmPWvuUdJQ5HO0wD+u5TiOTg2xYCKMb2bCEt0C0NPTMBfwbjGUCGTMBjzQOufTPJdVJ/Wfg8ZZvtv+/IRfC+mcoTuo7iUQ56cxPzge1pSEu48c2a1WujI9/uzoRYUlMNthz/6i4wzO9aJk2HF9ps/O0L3Hp96beJYJZxV099bDBWpAJ6ayDfAYBfnip3ORtMDSJ6iTrlA3obGGgn0K1MkwFKYmo8oXg2kIpH2KhzFj8HvvGOlIY63XzisHVsPZiXBvJumBj2ntBHbfcVJ1PMbP4sFbYeYnA5+5hjCb7sJecsDS2946vtn5ByjKs3G5xa5Bw4CJmy41PktX3bq4JtpPAya7w5gjbHcpgbO5H4at6fSF6RMxSydsHuX+1DtzVXtudc31rdxFfPggvz9b31DElpCdpKtspOEVHIwSu9iK2X4SRbAdFp6+dQwox1oKSZoeXn/i3x9zfsBF8z1g1jcibPwkYGBMPWqxfem4V4UcqZADK61zHHDdb02V/UFxdV8YZDYdmxNWLPmFydE5SsJOzSWGL2Ubhvoktt8L6sMEjLQb84DhJ9hxXeWXmuHzr7nlvAwN+xc/ES6pgrFO4vLzXdVN4ZYrebrPz8lPZPQH1YzX+xtE7pquxZeeHLZpTsxb8OMiHW88o1qLne9XsEHmen5PXZc9S5m2cCslwvOyWpUk35XFJr6IOwUQvc7YAZy57nU/QOj/Ki5BGN4xySoMB91aek+PAMCNP89Z1j7WRxf4ODga5oUqbnpEnpw9wVd5Ns9tLqa/IS1m7Ok7vTSK/4Aw6ONhVDS+RpV8ZkDrtbXC38/pG1+Y/AAAA//8BAAD//0PEnu1IBAAA';
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//   },
//   error => Promise.reject(error)
// );

export default axiosApi;
