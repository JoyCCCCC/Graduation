from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException


#注：要执行哪部分测试，把这部分测试注释取消即可

#前进后退
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/Activitymanagement/ActivityForm')
# time.sleep(5)
# browser.get('http://localhost:9528/#/charts/data')
# time.sleep(5)
# browser.back()
# time.sleep(5)
# browser.forward()

#显示等待
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/markmanagement/markForm')
# wait = WebDriverWait(browser, 10)
# search = browser.find_element(by=By.CSS_SELECTOR, value='.el-input__inner')
# search.send_keys('计算机网络的拓扑结构')
# time.sleep(1)
# ck = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.search')))
# browser.find_element(by=By.CSS_SELECTOR, value='.search').click()
# print(ck)

#节点交互4
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/user/userManagement')
# time.sleep(3)
# button = browser.find_element(by=By.CSS_SELECTOR, value='.delete')
# button.click()

#节点交互3
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/evaluate/evaluateManagement')
# button = browser.find_element(by=By.CSS_SELECTOR, value='.edit')
# button.click()
# time.sleep(1)
# browser.find_element(by=By.NAME, value="state").click()
# browser.find_element(by=By.NAME, value="yes").click()
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="eva")
# kw.send_keys('test')
# time.sleep(3)
# button = browser.find_element(by=By.CSS_SELECTOR, value='.save')
# button.click()

#节点交互2
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/markmanagement/markForm')
# button = browser.find_element(by=By.CSS_SELECTOR, value='.new')
# button.click()
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="cid")
# kw.send_keys('4')
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="tid")
# kw.send_keys('19760821')
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="name")
# kw.send_keys('操作系统之文件管理')
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="url")
# kw.send_keys('https://www.bilibili.com/5ce25a07-21de-4843-8ea5-0ce2b848174a')
# time.sleep(1)
# kw = browser.find_element(by=By.NAME, value="desc")
# kw.send_keys('文件管理是操作系统的五大职能之一，主要涉及文件的逻辑组织和物理组织，目录的结构和管理。')
# time.sleep(1)
# browser.find_element(by=By.CSS_SELECTOR, value='[type=file]').send_keys('D:\\ECNU\\intelligent-edu-frontend-master\\public\\static\\os1.jpg')
# button = browser.find_element(by=By.CSS_SELECTOR, value='.save')
# button.click()

#获取节点2
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/classmanagement/class')
# lis1 = browser.find_elements(by=By.CSS_SELECTOR, value='.name')
# lis2 = browser.find_elements(by=By.CSS_SELECTOR, value='.system')
# lis3 = browser.find_elements(by=By.CSS_SELECTOR, value='.demonstration')
# for li in lis1:
#     print(li.text)
# for li in lis2:
#     print(li.text)
# for li in lis3:
#     print(li.text)
# browser.close()

#节点交互1
# browser = webdriver.Chrome()
# browser.get('http://localhost:9528/#/desktop/desktop')
# link = browser.find_element(by=By.LINK_TEXT, value="数据结构之算法时间复杂度")
# link.click()
# time.sleep(1)
# button = browser.find_element(by=By.CSS_SELECTOR, value='.el-button')
# button.click()

#获取多个节点1
# browser1 = webdriver.Chrome()
# browser2 = webdriver.Chrome()
# browser1.get('http://localhost:9528/#/desktop2/desktop2')
# browser2.get('http://localhost:9528/#/desktop/desktop')
# lis1 = browser1.find_elements(by=By.CSS_SELECTOR, value='.name')
# lis2 = browser1.find_elements(by=By.CSS_SELECTOR, value='.evaluation')
# lis3 = browser1.find_elements(by=By.CSS_SELECTOR, value='.course')
# for li in lis3:
#     print(li.text)
# for li in lis1:
#     print(li.text)
# for li in lis2:
#     print(li.text)
# browser1.close()
# browser2.close()






