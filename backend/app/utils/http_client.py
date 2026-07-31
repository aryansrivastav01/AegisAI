import httpx


class HTTPClient:
    """
    Reusable async HTTP client.
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
                url,
                headers=headers,
                params=params,
                timeout=timeout,
            )

        return response

