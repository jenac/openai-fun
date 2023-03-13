import numpy as np
import gradio as gr
import openai

import os
import openai
openai.organization = "org-XMtARFaEgD2pR8Ea8yUZmeQS"
openai.api_key = os.getenv("OPENAI_API_KEY")
models = openai.Model.list()
print(models)

# openai.ChatCompletion.create(
#   model = "gpt-3.5-turbo",
#   messages
# )
def sepia(input_img):
    sepia_filter = np.array([
        [0.393, 0.769, 0.189], 
        [0.349, 0.686, 0.168], 
        [0.272, 0.534, 0.131]
    ])
    sepia_img = input_img.dot(sepia_filter.T)
    sepia_img /= sepia_img.max()
    return sepia_img

demo = gr.Interface(sepia, gr.Image(shape=(200, 200)), "image")
demo.launch()
