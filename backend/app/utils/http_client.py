import httpx


class HTTPClient:
    """
    Reusable asynchronous HTTP client.
    """

    async def get(
        self,
        url: str,
        headers: dict | None = None,
        params: dict | None = None,
        timeout: int = 15,
    ) -> httpx.Response:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url=url,
                headers=headers,
                params=params,
                timeout=timeout,
            )

        return response

    async def post(
        self,
        url: str,
        json: dict | None = None,
        headers: dict | None = None,
        timeout: int = 30,
    ) -> httpx.Response:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url=url,
                json=json,
                headers=headers,
                timeout=timeout,
            )

        return response
