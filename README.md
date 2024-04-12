# pitch-it
If you can't hit your pitch, PitchIt!

## Overview
Create a sophisticated tool designed to assist artists and musicians in the enhancement of melodies and the production of music.

## Problem
In the rapidly evolving landscape of music production, the creation of compelling vocal melodies remains at the heart of memorable songs. However, the journey from conceptualization to polished melody can be fraught with challenges, including creative blocks, technical limitations, and the nuanced task of capturing emotion effectively. A dedicated tool that assists artists in refining their melodies becomes invaluable, not only in streamlining the creative process but also in enhancing the emotional depth and technical quality of the music. Such a tool empowers musicians to experiment with greater freedom, explore new melodic territories, and achieve a level of polish that stands out in the competitive music industry. By offering immediate feedback, suggesting variations, and facilitating easy adjustments, this tool acts as an indispensable ally in the complex task of music production, especially in the crafting of vocal melodies that resonate with audiences.

## Motivation
My journey as a music artist and songwriter has been both rewarding and challenging, marked by moments of intense creativity and periods of stagnation. Over time, I recognized a recurring need for a solution that could bridge the gap between the initial spark of inspiration and the final masterpiece. Drawing on my experiences, I envisioned a tool that would not only address my challenges but also resonate with fellow artists facing similar hurdles. The development of this tool was driven by a deep understanding of the artistic process, informed by countless hours of songwriting, composition, and production. It embodies the lessons learned from both successes and setbacks, designed to nurture creativity, foster innovation, and elevate the music production process. This tool is more than just software; it's a reflection of a journey through the complexities of musical expression, offering a helping hand to those navigating the same path.

## Table of Contents
+ [Installation](#installation)
+ [Usage](#usage)
+ [Features](#features)
+ [Special Thanks](#thank-you-note)
+ [Contact Information](#contact)

## Installation
The project has a backend and a frontend. 

The frontend is a react-app, which can be run simply by navigating into the `client` folder and running `npm i && npm run start`.

The backend is encased in a docker container and would need to be built and run locally. More information can be found [here](https://docs.docker.com/?_gl=1*1ji20ty*_ga*MTg4MTU1MjUwMy4xNzExOTQ0MDM1*_ga_XJWPQMJYHQ*MTcxMjg4NTc5Ny4xLjEuMTcxMjg4NTc5OC41OS4wLjA.)

However, to avoid this hassle and allow for public use, the project can be accessed at [pitch-it.app](https://www.pitch-it.app)

## Usage
The project has utilized many libraries and frameworks. The frontend is primarily using React and NodeJS. Some of the API requests are made using Axios, which is also a JavaScript library. The backend is built using Python, with Flask being the main endpoint for APIs. In addition to this, Docker and a Linux VPS, running Nginx, are used for infrastructure and ease of deployment. 

Many Python libraries were also used for this project, such as:
+ [Gunicorn](https://gunicorn.org/)
+ [OpenAI's Whisper](https://openai.com/research/whisper)
+ [LibROSA](https://librosa.org/doc/main/index.html)
+ [NumPy](https://numpy.org/)
+ [Audioread](https://pypi.org/project/audioread/#description)
+ [PyDub](https://pypi.org/project/pydub/)
+ [NoiseReduce](https://pypi.org/project/noisereduce/)
+ [Soundfile](https://pypi.org/project/soundfile/)

## Features
The main features of this product are:

+ Select the language of the lyrics
+ Select the targeted key of the song
+ Upload an audio recording
+ Record audio using the WebAudio API
+ Set a range for vocals
+ Decide whether noise reduction should be applied
+ Analyze pitches associated with each lyric (with some basic pitch correction)

## Thank You Note
I would like to thank Professor Richard Mann for providing the opportunity to dive deeper with audio technology, as well as providing feedback, which not only improved the project, but also gave more insight into how these technologies actually function.

## Contact
[Aadar Gupta](aadargupta.ca)
