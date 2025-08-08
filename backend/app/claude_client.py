import anthropic
import os
import json
from typing import cast
import re
from datetime import datetime
import base64


def get_medical_analysis_from_text(text: str) -> dict:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return {"error": "ANTHROPIC_API_KEY environment variable not set."}

    client = anthropic.Anthropic(api_key=api_key)

    tool_definition = {
        "name": "extract_medical_data",
        "description": "Извлекает структурированную медицинскую информацию из результатов лабораторных анализов. Анализирует показатели, определяет отклонения от нормы и генерирует рекомендации.",
        "input_schema": {
            "type": "object",
            "properties": {
                "medical_results": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "patient_id": {
                                "type": "string",
                                "description": "Идентификатор пациента (если указан в документе)"
                            },
                            "analysis_type": {
                                "type": "string",
                                "description": "Тип анализа (например: 'Общий анализ крови', 'Биохимия', 'Гормоны щитовидной железы')"
                            },
                            "test_name": {
                                "type": "string",
                                "description": "Название теста/показателя (например: 'Гемоглобин', 'Холестерин', 'ТТГ')"
                            },
                            "value": {
                                "type": "string",
                                "description": "Значение показателя"
                            },
                            "unit": {
                                "type": "string",
                                "description": "Единица измерения (например: 'г/л', 'ммоль/л', 'мкМЕ/мл')"
                            },
                            "reference_range": {
                                "type": "string",
                                "description": "Референсный диапазон (нормальные значения)"
                            },
                            "status": {
                                "type": "string",
                                "description": "Статус: 'normal', 'high', 'low', 'critical'"
                            },
                            "priority": {
                                "type": "string",
                                "description": "Приоритет: 'low', 'medium', 'high', 'critical'"
                            },
                            "recommendations": {
                                "type": "string",
                                "description": "Рекомендации по лечению и дальнейшим действиям"
                            }
                        },
                        "required": ["test_name", "value", "status"]
                    }
                }
            },
            "required": ["medical_results"]
        }
    }

    processed_text = preprocess_medical_text(text)

    try:
        message = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=4096,
            tools=[tool_definition],  # type: ignore
            tool_choice={"type": "tool", "name": "extract_medical_data"},
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Ты - опытный врач-лаборант с 20-летним стажем. Проанализируй следующий текст с медицинскими анализами. "
                        "Используй свои медицинские знания для интерпретации любых форматов данных.\n\n"

                        "ВАЖНЫЕ ПРИНЦИПЫ АНАЛИЗА:\n"
                        "1. ИЩИ ЛЮБЫЕ ЧИСЛА И МЕДИЦИНСКИЕ ТЕРМИНЫ\n"
                        "2. СРАВНИВАЙ С НОРМАЛЬНЫМИ ЗНАЧЕНИЯМИ\n"
                        "3. УЧИТЫВАЙ ВОЗРАСТ И ПОЛ ПАЦИЕНТА\n"
                        "4. ГЕНЕРИРУЙ КОНКРЕТНЫЕ РЕКОМЕНДАЦИИ\n\n"

                        "МЕДИЦИНСКИЕ ЗНАНИЯ:\n"

                        "ОБЩИЙ АНАЛИЗ КРОВИ:\n"
                        "- Гемоглобин: мужчины 130-160 г/л, женщины 120-140 г/л\n"
                        "- Эритроциты: 4.0-5.5 *10^12/л\n"
                        "- Лейкоциты: 4.0-9.0 *10^9/л\n"
                        "- Тромбоциты: 180-320 *10^9/л\n"
                        "- СОЭ: мужчины 2-10 мм/ч, женщины 2-15 мм/ч\n\n"

                        "БИОХИМИЯ:\n"
                        "- Глюкоза: 3.9-6.1 ммоль/л\n"
                        "- Холестерин общий: до 5.2 ммоль/л\n"
                        "- Холестерин ЛПНП: до 3.0 ммоль/л\n"
                        "- Холестерин ЛПВП: мужчины >1.0, женщины >1.2 ммоль/л\n"
                        "- Триглицериды: до 1.7 ммоль/л\n"
                        "- Креатинин: мужчины 62-106, женщины 44-80 мкмоль/л\n"
                        "- Мочевина: 2.5-8.3 ммоль/л\n"
                        "- АЛТ: до 41 Ед/л\n"
                        "- АСТ: до 37 Ед/л\n"
                        "- Билирубин общий: 3.4-20.5 мкмоль/л\n\n"

                        "ГОРМОНЫ:\n"
                        "- ТТГ: 0.4-4.0 мкМЕ/мл\n"
                        "- Т4 свободный: 9-22 пмоль/л\n"
                        "- Т3 свободный: 2.6-5.7 пмоль/л\n"
                        "- Инсулин: 3-25 мкЕд/мл\n"
                        "- Кортизол: 138-635 нмоль/л\n\n"

                        "КРИТИЧЕСКИЕ ПОКАЗАТЕЛИ:\n"
                        "- Тропонин: <0.04 нг/мл (повышение = инфаркт)\n"
                        "- К+ (калий): 3.5-5.0 ммоль/л\n"
                        "- Na+ (натрий): 135-145 ммоль/л\n"
                        "- Ca++ (кальций): 2.1-2.6 ммоль/л\n\n"

                        "СТАТУСЫ ПОКАЗАТЕЛЕЙ:\n"
                        "- 'normal': значение в пределах нормы\n"
                        "- 'high': значение выше нормы\n"
                        "- 'low': значение ниже нормы\n"
                        "- 'critical': критическое отклонение\n\n"

                        "ПРИОРИТЕТЫ:\n"
                        "- 'low': незначительные отклонения\n"
                        "- 'medium': умеренные отклонения\n"
                        "- 'high': значительные отклонения\n"
                        "- 'critical': критические отклонения, требующие немедленного внимания\n\n"

                        "РЕКОМЕНДАЦИИ ПО ЗАБОЛЕВАНИЯМ:\n"

                        "АНЕМИЯ (низкий гемоглобин):\n"
                        "- Препараты железа (Сорбифер, Феррум Лек)\n"
                        "- Витамин B12 и фолиевая кислота\n"
                        "- Диета богатая железом (красное мясо, печень)\n"
                        "- Консультация гематолога\n\n"

                        "САХАРНЫЙ ДИАБЕТ (высокая глюкоза):\n"
                        "- Контроль сахара крови\n"
                        "- Диета с ограничением углеводов\n"
                        "- Физическая активность\n"
                        "- Консультация эндокринолога\n\n"

                        "АТЕРОСКЛЕРОЗ (высокий холестерин):\n"
                        "- Статины (Аторвастатин, Розувастатин)\n"
                        "- Диета с ограничением жиров\n"
                        "- Физическая активность\n"
                        "- Консультация кардиолога\n\n"

                        "ЗАБОЛЕВАНИЯ ЩИТОВИДНОЙ ЖЕЛЕЗЫ:\n"
                        "- При повышенном ТТГ: L-тироксин\n"
                        "- При пониженном ТТГ: тиреостатики\n"
                        "- Консультация эндокринолога\n\n"

                        "ЗАБОЛЕВАНИЯ ПЕЧЕНИ (высокие АЛТ/АСТ):\n"
                        "- Гепатопротекторы (Эссенциале, Гептрал)\n"
                        "- Диета №5\n"
                        "- Исключение алкоголя\n"
                        "- Консультация гастроэнтеролога\n\n"

                        "ПОЧЕЧНАЯ НЕДОСТАТОЧНОСТЬ (высокий креатинин):\n"
                        "- Ограничение белка в диете\n"
                        "- Контроль артериального давления\n"
                        "- Консультация нефролога\n\n"

                        "ОСОБЕННОСТИ АНАЛИЗА:\n"
                        "- Определяй тип анализа по названиям показателей\n"
                        "- Сравнивай значения с референсными диапазонами\n"
                        "- Учитывай возраст и пол пациента при определении норм\n"
                        "- Генерируй конкретные рекомендации\n"
                        "- Если видишь только числа без единиц - предполагай стандартные единицы\n"
                        "- Если нет референсных диапазонов - используй стандартные\n\n"

                        f"ТЕКСТ ДЛЯ АНАЛИЗА:\n{processed_text}"
                    )
                }
            ]
        )

        tool_use = next((block for block in message.content if block.type == 'tool_use'), None)
        if tool_use:
            return cast(dict, tool_use.input)
        else:
            text_response = next((block.text for block in message.content if block.type == 'text'),
                                 "No structured data extracted.")
            return {"error": "The model did not return structured data.", "response": text_response}

    except Exception as e:
        return {"error": str(e)}


def preprocess_medical_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text.strip())
    medical_patterns = [
        r'(\w+)\s*[:=]\s*([\d.,]+)\s*([а-яёa-z/%]+)?',
        r'([\d.,]+)\s*([а-яёa-z/%]+)\s*\(([^)]+)\)',
        r'(\w+)\s*([\d.,]+)\s*([а-яёa-z/%]+)',
    ]

    processed_lines = []
    lines = text.split('\n')

    for line in lines:
        line = line.strip()
        if not line:
            continue

        is_medical = False
        for pattern in medical_patterns:
            if re.search(pattern, line, re.IGNORECASE):
                is_medical = True
                break
        if is_medical or any(keyword in line.lower() for keyword in [
            'гемоглобин', 'лейкоциты', 'эритроциты', 'тромбоциты', 'глюкоза',
            'холестерин', 'креатинин', 'мочевина', 'алт', 'аст', 'билирубин',
            'ттг', 'т4', 'т3', 'инсулин', 'кортизол', 'тропонин', 'калий',
            'натрий', 'кальций', 'анализ', 'кровь', 'биохимия', 'гормоны'
        ]):
            processed_lines.append(line)
        else:
            if re.search(r'\d+', line):
                processed_lines.append(line)

    return '\n'.join(processed_lines)


def get_general_assistant_response(text: str) -> dict:
    """
    Ассистент-врач: всегда отвечает как опытный врач, не придумывает анализы, если их не было в вопросе.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return {"error": "ANTHROPIC_API_KEY environment variable not set."}
    client = anthropic.Anthropic(api_key=api_key)
    try:
        message = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Ты — личный терапевт пользователя (врач общей практики) с 20-летним стажем. "
                        "Общайся естественно и по‑человечески, на ‘вы’, с эмпатией и поддержкой. Объясняй простыми словами, без лишней терминологии.\n\n"
                        "Правила ответа: \n"
                        "- Не выдумывай анализы/симптомы, опирайся только на то, что дал пользователь.\n"
                        "- Не ставь окончательный диагноз дистанционно. Если данных мало — задай до 3 уточняющих вопросов.\n"
                        "- Если ситуация потенциально неотложная — мягко и чётко порекомендуй срочно обратиться за помощью (103/112).\n"
                        "- Дай краткий понятный план действий: 3–5 пунктов, что делать далее.\n"
                        "- Пиши короткими абзацами. Где уместно — используй маркированные списки.\n"
                        "- Язык ответа: отвечай на том же языке, на котором задан вопрос. Если пользователь пишет по‑английски — отвечай по‑английски. Если пишет на узбекском — отвечай на узбекском. При необходимости можно кратко пояснить сложные термины по‑русски в скобках.\n\n"
                        f"Запрос пользователя: {text}"
                    ),
                }
            ],
        )
        if isinstance(message.content, list):
            answer = "".join(block.text for block in message.content if hasattr(block, "text"))
        else:
            answer = str(message.content)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}


def analyze_medical_image(image_path: str) -> dict:
    """
    Анализ медицинских изображений с помощью Claude Vision.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return {"error": "ANTHROPIC_API_KEY environment variable not set."}

    client = anthropic.Anthropic(api_key=api_key)

    try:
        # Определяем media type на основе расширения файла
        file_ext = os.path.splitext(image_path)[1].lower()
        media_type_map = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.tiff': 'image/tiff',
            '.tif': 'image/tiff'
        }
        media_type = media_type_map.get(file_ext, 'image/jpeg')

        # Читаем изображение и кодируем в base64
        with open(image_path, "rb") as image_file:
            image_data = image_file.read()
            image_base64 = base64.b64encode(image_data).decode('utf-8')

        message = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "Ты — опытный врач-рентгенолог с 15-летним стажем анализа медицинских изображений. "
                                "Проанализируй предоставленное медицинское изображение и дай профессиональную оценку.\n\n"
                                "ИНСТРУКЦИИ ПО АНАЛИЗУ:\n"
                                "1. Опиши видимые анатомические структуры\n"
                                "2. Оцени качество изображения (четкость, контрастность)\n"
                                "3. Ищи патологические изменения (если есть)\n"
                                "4. Определи тип исследования (МРТ, КТ, рентген, УЗИ и т.д.)\n"
                                "5. Укажи область тела (если возможно)\n\n"
                                "ВАЖНЫЕ ОГРАНИЧЕНИЯ:\n"
                                "- НЕ ставь окончательный диагноз\n"
                                "- НЕ назначай лечение\n"
                                "- Если видишь серьезные патологии — обязательно укажи необходимость срочной консультации\n"
                                "- Всегда подчеркивай, что это предварительная оценка\n\n"
                                "СТРУКТУРА ОТВЕТА:\n"
                                "1. Тип исследования и область\n"
                                "2. Качество изображения\n"
                                "3. Описание анатомических структур\n"
                                "4. Выявленные изменения (если есть)\n"
                                "5. Рекомендации\n\n"
                                "Отвечай на русском языке, используй медицинскую терминологию, но объясняй простыми словами."
                            )
                        },
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_base64
                            }
                        }
                    ]
                }
            ]
        )

        if isinstance(message.content, list):
            answer = "".join(block.text for block in message.content if hasattr(block, "text"))
        else:
            answer = str(message.content)

        return {
            "analysis": answer,
            "image_path": image_path,
            "analysis_timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        return {"error": f"Ошибка анализа изображения: {str(e)}"}