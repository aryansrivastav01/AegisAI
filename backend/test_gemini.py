import asyncio
from app.services.ai_service import AIService
from app.core.config import settings
from app.ai.parser import AIParser
from app.ai.prompt_builder import PromptBuilder

async def main():
    print(f"Using provider: {settings.llm_provider}")
    threat_report = {
        "summary": {
            "overall_risk": "Clean",
            "total_ips": 2,
            "total_domains": 0,
            "total_urls": 0,
            "total_hashes": 0,
        },
        "threat_intelligence": {
            "ips": [
                {"ioc": "8.8.8.8", "overall_reputation": "Clean"},
                {"ioc": "1.1.1.1", "overall_reputation": "Clean"},
            ],
            "domains": [],
            "urls": [],
            "hashes": [],
        },
    }

    ai = AIService()
    prompt = ai.prompt_builder.build_prompt(threat_report)
    
    try:
        raw_response = await ai.provider.generate(prompt)
        print("Raw response:", raw_response)
        parsed = AIParser.parse(raw_response)
        print("\n" + "=" * 80)
        print(parsed.model_dump_json(indent=4))
        print("=" * 80)
    except Exception as e:
        print("ERROR:", str(e))
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
