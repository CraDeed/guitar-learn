import json
import os
import sys
from bs4 import BeautifulSoup
from selenium import webdriver
import time
from urllib import parse
import chromedriver_autoinstaller

def youtube_craw(artist="", song=""):
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument('disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options._binary_location = os.environ.get('GOOGLE_CHROME_BIN')

    parse_artist = parse.quote_plus(artist)
    parse_song = parse.quote_plus(song)
    guitar = parse.quote_plus("기타 강좌")

    # path = chromedriver_autoinstaller.install()

    url = f"https://www.youtube.com/results?search_query={parse_artist}+{parse_song}+{guitar}"

    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), options=options)
    # driver = webdriver.Chrome(executable_path=path, options=options)

    driver.get(url)

    driver.implicitly_wait(2)

    SCROLL_PAUSE_TIME = 1
    # 한번 스크롤 하고 멈출 시간 설정

    from selenium.webdriver.common.keys import Keys

    body = driver.find_element_by_tag_name('body')
    # body태그를 선택하여 body에 넣음
    

    for _ in range(4):
        body.send_keys(Keys.END)
        # body 본문에 END키를 입력(스크롤내림)
        time.sleep(SCROLL_PAUSE_TIME)

    page = driver.page_source

    driver.quit()

    soup = BeautifulSoup(page, 'lxml')

    all_videos = soup.find_all('div',id='dismissible')

    video_list = []

    if(not all_videos):
        return print(json.dumps([]), end='')

    for video in all_videos:
        
        title_link = video.find('a',id='video-title')
        artist_link = video.find('div',id="channel-info")
        img_link = video.find('a',id="thumbnail")

        lower_title = title_link['title'].lower().strip()

        if song == "":
            if (artist in lower_title):
                if ('기타' in lower_title) or ('guitar' in lower_title) or ('acoustic' in lower_title):
                    if ('커버' in lower_title) or ('cover' in lower_title) or ('lesson' in lower_title) or ('tab' in lower_title) or ('코드' in lower_title) or ('chords' in lower_title) or ('강좌' in lower_title):
                        title = title_link['title']
                        link = 'https://www.youtube.com' + title_link['href']
                        thumbnail = img_link.find('img',id="img").get('src')
                        key = img_link.get("href").replace("/watch?v=","")
                        youtuber = artist_link.find('a',class_="yt-simple-endpoint style-scope yt-formatted-string").get_text()
                        youtuberImage = artist_link.find('img',id="img").get('src')

                        if (title and link and youtuber and thumbnail and key and youtuberImage):
                            video_list.append({'title': title, "link": link, 'youtuber': youtuber, 'thumbnail' : thumbnail, 'key': key , 'youtuberImage':youtuberImage})
        
        elif artist=="":
            if (song in lower_title):
                if ('기타' in lower_title) or ('guitar' in lower_title) or ('acoustic' in lower_title):
                    if ('커버' in lower_title) or ('cover' in lower_title) or ('lesson' in lower_title) or ('tab' in lower_title) or ('코드' in lower_title) or ('chords' in lower_title) or ('강좌' in lower_title):
                        title = title_link['title']
                        link = 'https://www.youtube.com' + title_link['href']
                        thumbnail = img_link.find(id="img").get('src')
                        key = img_link.get("href").replace("/watch?v=","")
                        youtuber = artist_link.find('a',class_="yt-simple-endpoint style-scope yt-formatted-string").get_text()
                        youtuberImage = artist_link.find('img',id="img").get('src')

                        if (title and link and youtuber and thumbnail and key and youtuberImage):
                            video_list.append({'title': title, "link": link, 'youtuber': youtuber, 'thumbnail' : thumbnail, 'key': key , 'youtuberImage':youtuberImage})

        else:
            if (artist in lower_title):
                if song in lower_title:
                    if ('기타' in lower_title) or ('guitar' in lower_title) or ('acoustic' in lower_title):
                        if ('커버' in lower_title) or ('cover' in lower_title) or ('lesson' in lower_title) or ('tab' in lower_title) or ('코드' in lower_title) or ('chords' in lower_title) or ('강좌' in lower_title):
                            title = title_link['title']
                            link = 'https://www.youtube.com' + title_link['href']
                            thumbnail = img_link.find(id="img").get('src')
                            key = img_link.get("href").replace("/watch?v=","")
                            youtuber = artist_link.find('a',class_="yt-simple-endpoint style-scope yt-formatted-string").get_text()
                            youtuberImage = artist_link.find('img',id="img").get('src')

                            if (title and link and youtuber and thumbnail and key and youtuberImage):
                                video_list.append({'title': title, "link": link, 'youtuber': youtuber, 'thumbnail' : thumbnail, 'key': key , 'youtuberImage':youtuberImage})

    print(json.dumps(video_list), end='')
if __name__=='__main__':
    youtube_craw(sys.argv[1], sys.argv[2])