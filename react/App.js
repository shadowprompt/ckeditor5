import React, {useState, useRef, useEffect } from 'react';
// The official <CKEditor> component for React.
import { CKEditor } from '@ckeditor/ckeditor5-react';

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// The base editor class and features required to run the editor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import editableDiv from '../plugins/editableDiv/editableDiv';
import InsertImagePlugin from '../plugins/InsertImagePlugin';
import simplebox from '../plugins/simplebox/simplebox';
import attrPlugin from "../plugins/attrPlugin";
import attrExtraPlugin from "../plugins/attrExtraPlugin";
import CustomFigureAttributes from  '../plugins/CustomFigureAttributes'
import imageAttrPlugin from "../plugins/imageAttrPlugin";
import tableAttrPlugin from "../plugins/tableAttrPlugin";



function App(props) {
	const [editorData, setEditorData] = useState(`
  <a target="_target" href="https://www.so.com">so</a>
  
<img src="http://images4.c-ctrip.com/target/200w1e000001flg8f58A8_R_130_130.jpg" class="test_img" width="110" height="110" alt="测试图片">

  <div contenteditable="true" style="border:none; width:97%; height:100%; padding:0 10px; outline:0;" id="text-elem3684202278817734"><p class="default-CtripEmail-style" style="color:undefined;font-size:undefined;font-family:undefined;margin: 0"><br></p><p class="default-CtripEmail-style" style="margin: 0px;">&nbsp;&nbsp;</p>          <div class="template_20200702"></div>          <p class="default-CtripEmail-style" style="margin: 0px;">&nbsp;</p><div class="signature_containerrwpaixgwez"><p>这是签名（新建邮件）</p></div><p class="default-CtripEmail-style" style="margin: 0px;">                        </p><p class="default-CtripEmail-style" style="margin: 0px;">&nbsp;</p> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <style type="text/css">
        .mail-wrapper-container {
            padding: 0 20px;
        }
    </style> 
 
 
  <!-- v3 --> 
  <!-- header start --> 
  <table class="mail-header-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="text-align:left;"> 
   <tbody> 
    <tr> 
     <td width="16"></td> 
     <td> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0"> 
       <tbody>
        <tr> 
         <td height="20"></td> 
        </tr> 
        <tr> 
         <td> <a href="https://hk.fat1.qa.nt.tripqate.com" style="font-size: 0;display: block"> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/new-logo/Trip_logo.ca89ce7f.jpeg" width="122" style="width: 122px; display: block; border: none;"> </a> </td> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; font-size: 14px;line-height: 18px; color:#0F294D; text-align: right; vertical-align: top;"> <a style="color: #0F294D;text-decoration: none;cursor: text;display: block;"> 訂單編號:<span style="color: #287DFA ;">32139992461</span> </a> </td> 
        </tr> 
        <tr> 
         <td height="5"></td> 
        </tr> 
        <tr> 
         <td colspan="2" height="1" bgcolor="#DADFE6"></td> 
        </tr> 
       </tbody>
      </table> </td> 
     <td width="16"></td> 
    </tr> 
   </tbody> 
  </table> 
  <!-- header end --> 
  <div itemscope="" itemtype="http://schema.org/LodgingReservation"> 
   <meta itemprop="reservationNumber" content="abc456"> 
   <link itemprop="reservationStatus" href="http://schema.org/Confirmed"> 
   <div itemprop="underName" itemscope="" itemtype="http://schema.org/Person"> 
    <meta itemprop="name" content="John Smith"> 
   </div> 
   <div itemprop="reservationFor" itemscope="" itemtype="http://schema.org/LodgingBusiness"> 
    <meta itemprop="name" content="Hilton San Francisco Union Square"> 
    <div itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress"> 
     <meta itemprop="streetAddress" content="333 O'Farrell St"> 
     <meta itemprop="addressLocality" content="San Francisco"> 
     <meta itemprop="addressRegion" content="CA"> 
     <meta itemprop="postalCode" content="94102"> 
     <meta itemprop="addressCountry" content="US"> 
    </div> 
    <meta itemprop="telephone" content="415-771-1400"> 
   </div> 
   <meta itemprop="checkinDate" content="2027-04-11T16:00:00-08:00"> 
   <meta itemprop="checkoutDate" content="2027-04-13T11:00:00-08:00"> 
  </div>   
  <br>
  <br> 
  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"> 
  </table>
  <table class="mail-wrapper-container" align="center" border="0" cellpadding="0" cellspacing="0" style="font-family:'Arial', sans-serif;font-size:14px;color:#333;text-align:left;width: 600px;background: #fcfcfc;"> 
   <tbody>
    <tr> 
     <td> 
      <table border="0" cellpadding="0" cellspacing="0"> 
       <tbody>
        <tr> 
         <td height="25"></td> 
        </tr> 
        <tr> 
         <td> 
          <table cellspacing="0" cellpadding="0" border="0"> 
           <tbody> 
            <tr> 
             <td style="vertical-align: top;padding:2px 10px 0 0;"><img src="http://pic.english.c-ctrip.com/picaresenglish/ibu/fe-mail/hotel/images/mail-correct.f2cb73d2.png" width="24" height="24"></td> 
             <td style="font-family:Arial,sans-serif;font-size: 22px;font-weight: bold;vertical-align: top;"> 請提供入住詳情（訂單編號：32139992461）</td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <tr> 
         <td height="25"></td> 
        </tr> 
        <tr> 
         <td style="font-family:Arial,sans-serif;font-size: 14px;"> 親愛的li nana， </td> 
        </tr> 
        <tr> 
         <td height="12"> </td> 
        </tr> 
        <tr> 
         <td style="font-family:Arial,sans-serif;font-size: 14px;line-height:24px;"> <p style="font-family:Arial,sans-serif;font-size: 14px;line-height:24px;margin:0;margin-bottom:12px;"> 關於您於Hotel Mi Singapore的預訂（訂單編號：32139992461）酒店或供應商需要您提供額外資料以確保預訂能正常確認。<br> <br> 請提供以下資料：<br> <br> <span style=" min-width: 2px; display: inline-block; ">[性別：<br> 姓名：<br> 國籍：]</span> <br> 謝謝！</p> <p style="font-family:Arial,sans-serif;font-size: 14px;line-height:24px;margin:0;margin-bottom:12px;"> <span style="
    min-width: 2px;
    display: inline-block;
">xxxxx謹啟<br> 客戶服務中心</span></p> </td>
        </tr> 
       </tbody>
      </table> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
       <tbody>
        <tr> 
         <td align="center"> 
          <table border="0" cellpadding="0" cellspacing="0" style="display:inline-block;"> 
           <tbody> 
            <tr> 
             <td width="30"></td> 
             <td style="border:1px solid #2577E3;border-radius:4px;text-align:center;padding:8px 20px;min-width: 130px;"> <a href="https://hk.trip.com/hotels/List?city=73&amp;locale=zh-HK" style="font-family:Arial,sans-serif;display:block;width:100%;font-size:14px;color:#2577E3;text-decoration:none;"> 預訂其他酒店 </a> </td> 
             <td width="30"></td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <tr> 
         <td height="20"></td> 
        </tr> 
       </tbody>
      </table> </td> 
    </tr> 
   </tbody>
  </table> 
  <table class="mail-wrapper-container" align="center" border="0" cellpadding="0" cellspacing="0" style="font-family:'Arial', sans-serif;font-size:14px;color:#333;text-align:left;width: 600px;background: #fcfcfc;"> 
   <tbody>
    <tr> 
     <td height="25"></td> 
    </tr> 
    <tr> 
     <td style="font-family:'Arial', sans-serif;font-size: 22px;font-weight: bold;"> 訂單詳情 </td> 
    </tr> 
    <tr> 
     <td height="25"></td> 
    </tr> 
    <tr> 
     <td> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
       <tbody>
        <tr> 
         <td width="110" height="110" style="padding-right:20px;vertical-align: top;"> <img src="http://images4.c-ctrip.com/target/200w1e000001flg8f58A8_R_130_130.jpg" width="110" height="110"> </td> 
         <td style="vertical-align: top;"> 
          <table border="0" cellpadding="0" cellspacing="0" style="line-height: 1.5;"> 
           <tbody>
            <tr> 
             <td style="font-family:'Arial', sans-serif;font-size: 18px;font-weight: bold;"> <a href="https://hk.trip.com/hotels/detail?hotelid=10231080&amp;locale=zh-HK" style="color:#0066cc;font-size:18px;font-weight:bold;text-decoration:none;">Hotel Mi Singapore</a> </td> 
            </tr> 
            <tr> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;"> <img src="http://pic.english.c-ctrip.com/picaresenglish/ibu/fe-mail/hotel/images/mail-loca.93c0db1e.png" alt="" width="16" height="16"> &nbsp;新加坡，新加坡，Bencoolen Street </td> 
            </tr> 
            <tr> 
             <td height="5"></td> 
            </tr> 
            <tr> 
             <td height="2"></td> 
            </tr> 
            <tr> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;color:#2577E3;"> <img src="http://pic.english.c-ctrip.com/picaresenglish/ibu/fe-mail/hotel/images/mail-tel.6f5c6793.png" alt="" width="16" height="16"> &nbsp;+65-62518822 </td> 
            </tr> 
           </tbody>
          </table> </td> 
        </tr> 
       </tbody>
      </table> </td> 
    </tr> 
    <tr> 
     <td height="20"></td> 
    </tr> 
    <tr> 
     <td> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0"> 
       <tbody>
        <tr> 
         <td colspan="2" height="20" style="border-top:1px dashed #ddd;"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 14px;padding-right: 5px;font-weight:bold;vertical-align:top;">您的訂單</td> 
         <td style="font-family:'Arial', sans-serif;font-size: 14px;vertical-align: top;"> 2間， 1 晚 </td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20" style="border-bottom:1px dashed #ddd;"></td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 14px;padding-right: 5px;font-weight:bold;vertical-align:top;"> 入住時間</td> 
         <td style="vertical-align:top;"> 
          <table cellspacing="0" cellpadding="0" border="0"> 
           <tbody> 
            <tr> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;word-break:break-word;min-width:105px;vertical-align:top;">2021年2月21日</td> 
             <td width="10"></td> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;vertical-align:top;"> (14:00 - 23:00) &nbsp;<span style="font-family:'Arial', sans-serif;font-size: 12px;color:#999;">酒店當地時間</span> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <tr> 
         <td colspan="2" height="8"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 12px;color:#999;padding-right: 5px;vertical-align: top;"></td> 
         <td style="vertical-align: top;font-family:'Arial', sans-serif;font-size: 12px;color:#999;"> <img src="http://pic.english.c-ctrip.com/picaresenglish/ibu/fe-mail/hotel/images/mail-info-gray.c8438cb4.png" alt="" width="12" height="12"> &nbsp;如您未能按時到達酒店，酒店可能會取消您預留的客房。 </td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 14px;padding-right: 5px;font-weight:bold;vertical-align:top;">退房時間</td> 
         <td style="vertical-align:top;"> 
          <table cellspacing="0" cellpadding="0" border="0"> 
           <tbody> 
            <tr> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;min-width:105px;vertical-align:top;">2021年2月14日</td> 
             <td width="10"></td> 
             <td style="font-family:'Arial', sans-serif;font-size: 14px;"> (11:00之前)&nbsp; <span style="font-family:'Arial', sans-serif;font-size: 12px;color:#999;">酒店當地時間</span> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <tr> 
         <td colspan="2" height="8"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 12px;color:#999;padding-right: 5px;vertical-align: top;"></td> 
         <td style="vertical-align: top;font-family:'Arial', sans-serif;font-size: 12px;color:#999;"></td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20"></td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20" style="border-top:1px dashed #ddd;"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 14px;padding-right: 5px;font-weight:bold;vertical-align: top;">住客姓名</td> 
         <td style="font-family:'Arial', sans-serif;font-size: 14px;vertical-align: top;"> li nana,liu xia </td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20"></td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20" style="border-top:1px dashed #ddd;"></td> 
        </tr> 
        <tr> 
         <td width="100" style="font-family:'Arial', sans-serif;font-size: 14px;padding-right: 5px;font-weight:bold;vertical-align: top;">房型</td> 
         <td style="font-family:'Arial', sans-serif;font-size: 14px;vertical-align: top;line-height: 1.5;">高級房帶陽台</td> 
        </tr> 
        <tr> 
         <td colspan="2" height="20"></td> 
        </tr> 
       </tbody>
      </table> </td> 
    </tr> 
   </tbody>
  </table>    
  <!-- footer start --> 
  <table class="mail-footer-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="text-align:left;"> 
   <tbody> 
    <tr> 
     <td width="16"></td> 
     <td> 
      <table width="100%" border="0" cellpadding="0" cellspacing="0"> 
       <tbody>
        <tr> 
         <td height="16"></td> 
        </tr> 
        <!-- 下载模块 --> 
        <tr> 
         <td> 
          <table width="100%" cellspacing="0" cellpadding="0"> 
           <tbody> 
            <tr> 
             <!-- 下载模块 - 左侧logo --> 
             <td width="58" valign="top"> 
              <table width="100%" border="0" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td height="4"></td> 
                </tr> 
                <tr> 
                 <td> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/app-install.085b7dd9.png" alt="Trip.com" style="width: 58px; display: block; border: none"> </td> 
                </tr> 
               </tbody> 
              </table> </td> 
             <!-- 下载模块 - 左侧logo结束 --> 
             <td width="12"></td> 
             <td> 
              <!-- 下载模块 - 文案介绍 --> 
              <table class="mail-app-install-left-container" width="100%" align="left" valign="middle" border="0" cellpadding="0" cellspacing="4"> 
               <tbody> 
                <!-- 下载模块 - 文案介绍 - 标题 --> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 16px;line-height: 1.4; color:#0F294D;text-align: left;font-weight: bold;vertical-align: top;"> 下載 Trip.com App，解鎖優惠價格！ </td> 
                </tr> 
                <!-- 下载模块 - 文案介绍 - 标题结束 --> 
                <tr> 
                 <td></td> 
                </tr> 
                <tr> 
                 <td> 
                  <table width="100%" cellpadding="0" cellspacing="0"> 
                   <tbody> 
                    <tr> 
                     <td width="4" valign="top"> <span style="width: 4px;height: 4px;background: #0F294D;display: block;margin-top: 4px;"></span> </td> 
                     <td width="8"></td> 
                     <td valign="top" style="font-family:'helvetica', 'Arial', sans-serif;font-size: 12px;line-height: 1.2; color:#0F294D;text-align: left;font-weight: normal;"> 隨時隨地安排下個旅程 </td> 
                    </tr> 
                   </tbody> 
                  </table> </td> 
                </tr> 
                <tr> 
                 <td> 
                  <table width="100%" cellpadding="0" cellspacing="0"> 
                   <tbody> 
                    <tr> 
                     <td width="4" valign="top"> <span style="width: 4px;height: 4px;background: #0F294D;display: block;margin-top: 4px;"></span> </td> 
                     <td width="8"></td> 
                     <td valign="top" style="font-family:'helvetica', 'Arial', sans-serif;font-size: 12px;line-height: 1.2; color:#0F294D;text-align: left;font-weight: normal;"> ؜輕鬆管理訂單 </td> 
                    </tr> 
                   </tbody> 
                  </table> </td> 
                </tr> 
                <tr> 
                 <td> 
                  <table width="100%" cellpadding="0" cellspacing="0"> 
                   <tbody> 
                    <tr> 
                     <td width="4" valign="top"> <span style="width: 4px;height: 4px;background: #0F294D;display: block;margin-top: 4px;"></span> </td> 
                     <td width="8"></td> 
                     <td valign="top" style="font-family:'helvetica', 'Arial', sans-serif;font-size: 12px;line-height: 1.2; color:#0F294D;text-align: left;font-weight: normal;"> 專屬機票及酒店優惠 </td> 
                    </tr> 
                   </tbody> 
                  </table> </td> 
                </tr> 
               </tbody> 
              </table> 
              <!-- 下载模块 - 文案介绍结束 --> 
              <!-- 下载模块 - 右侧按钮 --> 
              <table class="mail-app-install-right-container" width="100%" align="right" valign="middle" border="0" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td height="8"></td> 
                </tr> 
                <tr> 
                 <td> <a style="text-decoration: none;border: none;outline: none;display: inline-block;font-size: 0;" href="https://tripcom.onelink.me/3361031008?pid=social&amp;c=&amp;butype=&amp;af_sub1=locale%253Dzh-HK%2526aid%253D1301808%2526sid%253D3874671%2526ext%253Dfromorder%25253D1&amp;af_sub2=aid%253D1301808%2526sid%253D3874671&amp;af_dp=ctripglobal%3A%2F%2Fhome%3Faid%3D1301808%26sid%3D3874671&amp;deep_link_value=ctripglobal%3A%2F%2Fhome%3Faid%3D1301808%26sid%3D3874671&amp;af_web_dp=https%3A%2F%2Fhk.trip.com%2Fm%2Fdownapp%3Flocale%3Dzh-HK%26utm_medium%3Dinternal%26utm_source%3D%26utm_campaign%3D0%26utm_content%3Dlocale%253Dzh-HK%2526aid%253D1301808%2526sid%253D3874671%2526ext%253Dfromorder%25253D1"> <span style="display: block;font-size: 14px;color: #ffffff;text-decoration: none;background: #287dfa;border-radius: 2px;text-align: center;padding-top: 8px;padding-right: 16px;padding-bottom: 8px;padding-left: 16px;"> 立即下載 </span> </a> </td> 
                </tr> 
               </tbody> 
              </table> 
              <!-- 下载模块 - 右侧按钮结束 --> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <!-- 下载模块结束 --> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <!-- 权益模块 --> 
        <tr> 
         <td height="1" bgcolor="#DADFE6"></td> 
        </tr> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <!-- 权益模块 - 标题 --> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 20px;line-height: 1.4;letter-spacing:0; color:#0F294D; font-weight: bold;"> 有 Trip.com，旅行從此不再孤單！ </td> 
        </tr> 
        <!-- 权益模块 - 标题结束 --> 
        <tr> 
         <td height="16"></td> 
        </tr> 
        <!-- 权益模块 - 权益1 - help --> 
        <tr> 
         <td> 
          <table width="100%" cellpadding="0" cellspacing="0"> 
           <tbody> 
            <tr> 
             <td width="22" valign="top"> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/help.69d7bda3.png" alt="Trip.com" style="width: 22px;border: none;display: block;"> </td> 
             <td width="12"></td> 
             <td valign="top"> 
              <table width="100%" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 16px;letter-spacing: 0; color:#0F294D; font-weight: bold;"> 需要幫助或建議嗎？ </td> 
                </tr> 
                <tr> 
                 <td height="6"></td> 
                </tr> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 14px;letter-spacing:0; color:#455873; font-weight: normal;"> 輕鬆<a href="https://hk.trip.com/servicechatv2/?appId=100022887&amp;isPreSale=0&amp;sceneCode=0&amp;bizType=1321&amp;channel=G300058&amp;locale=zh-HK&amp;orderInfo=%7B%22title%22%3A%22Hotel%20Mi%20Singapore%22%2C%22desc%22%3A%222021%E5%B9%B42%E6%9C%8821%E6%97%A5%20-%202021%E5%B9%B42%E6%9C%8814%E6%97%A5%202%E9%96%93%EF%BC%8C%201%20%E6%99%9A%22%7D" style="display: inline-block;color: #287dfa !important;font-family:'helvetica','Arial', sans-serif;font-size: 14px;letter-spacing: 0;font-weight: normal;">一按</a> 連接即時客戶支援服務，為您解決各種疑難。 </td> 
                </tr> 
               </tbody> 
              </table> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <!-- 权益模块 - 权益1 - help结束 --> 
        <tr> 
         <td height="16"></td> 
        </tr> 
        <!-- 权益模块 - 权益2 - faq --> 
        <tr> 
         <td> 
          <table width="100%" cellpadding="0" cellspacing="0"> 
           <tbody> 
            <tr> 
             <td width="24" valign="top"> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/faq.3a2aa41e.png" alt="Trip.com" style="width: 24px;border: none;display: block;"> </td> 
             <td width="12"></td> 
             <td valign="top"> 
              <table width="100%" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 16px;letter-spacing: 0; color:#0F294D; font-weight: bold;"> 常見問題 </td> 
                </tr> 
                <tr> 
                 <td height="6"></td> 
                </tr> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 14px;letter-spacing:0; color:#455873; font-weight: normal;"> 有疑問？您可以<a href="https://hk.fat1.qa.nt.tripqate.com/pages/faq/?locale=zh_hk&amp;refer=emailfooter" style="display: inline-block;color: #287dfa !important;font-family:'helvetica','Arial', sans-serif;font-size: 14px;letter-spacing: 0;font-weight: normal;">按此查看更多</a>. </td> 
                </tr> 
               </tbody> 
              </table> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <!-- 权益模块 - 权益2 - faq结束 --> 
        <tr> 
         <td height="16"></td> 
        </tr> 
        <!-- 权益模块 - 权益3 - support --> 
        <tr> 
         <td> 
          <table width="100%" cellpadding="0" cellspacing="0"> 
           <tbody> 
            <tr> 
             <td width="22" valign="top"> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/support.8af410f4.png" alt="Trip.com" style="width: 22px;border: none;display: block;"> </td> 
             <td width="12"></td> 
             <td valign="top"> 
              <table width="100%" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 16px;letter-spacing: 0; color:#0F294D; font-weight: bold;"> 極速支援 </td> 
                </tr> 
                <tr> 
                 <td height="6"></td> 
                </tr> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 14px;letter-spacing:0; color:#455873; font-weight: normal;"> 需要<a href="https://hk.fat1.qa.nt.tripqate.com/help?locale=zh_hk&amp;refer=emailfooter" style="display: inline-block;color: #287dfa !important;font-family:'helvetica','Arial', sans-serif;font-size: 14px;letter-spacing: 0;font-weight: normal;">通話支援</a>？我們提供24小時客戶服務支援，保證隨傳隨到。 </td> 
                </tr> 
               </tbody> 
              </table> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <!-- 权益模块 - 权益3 - support结束 --> 
        <tr> 
         <td height="16"></td> 
        </tr> 
        <!-- 权益模块 - 权益4 - service guarantee --> 
        <tr> 
         <td> 
          <table width="100%" cellpadding="0" cellspacing="0"> 
           <tbody> 
            <tr> 
             <td width="21" valign="top"> <img src="https://pic.english.fws.qa.nt.ctripcorp.com/picaresenglish/ibu/fe-mail/images/service-guarantee.384b7ac1.png" alt="Trip.com" style="width: 21px;border: none;display: block;"> </td> 
             <td width="12"></td> 
             <td valign="top"> 
              <table width="100%" cellpadding="0" cellspacing="0"> 
               <tbody> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 16px;letter-spacing: 0; color:#0F294D; font-weight: bold;"> 安心出發 </td> 
                </tr> 
                <tr> 
                 <td height="6"></td> 
                </tr> 
                <tr> 
                 <td style="font-family:'helvetica', 'Arial', sans-serif;font-size: 14px;letter-spacing:0; color:#455873; font-weight: normal;"> 隨心探索世界，我們的<a href="https://hk.fat1.qa.nt.tripqate.com/pages/customer-service/?locale=zh_hk&amp;refer=emailfooter" style="display: inline-block;color: #287dfa !important;font-family:'helvetica','Arial', sans-serif;font-size: 14px;letter-spacing: 0;font-weight: normal;">服務保證</a>會在背後支持您。 </td> 
                </tr> 
               </tbody> 
              </table> </td> 
            </tr> 
           </tbody> 
          </table> </td> 
        </tr> 
        <!-- 权益模块 - 权益4 - service guarantee结束 --> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <!-- 权益模块结束 --> 
        <!-- 底部模块 --> 
        <tr> 
         <td height="1" bgcolor="#DADFE6"></td> 
        </tr> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; line-height: 21px; font-size: 16px; font-weight:bold;color:#287dfa; text-align: left;letter-spacing: 0;"> 放心的服務，安心的價格 </td> 
        </tr> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; line-height: 22px; font-size: 14px; color:#0F294D;"> 感謝您使用 Trip.com<br>客戶服務團隊 </td> 
        </tr> 
        <tr> 
         <td height="20"></td> 
        </tr> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; line-height: 17px; font-size: 12px; color:#8592A6;"> 電郵包括您的個人資料和訂單詳情，請不要轉寄。 </td> 
        </tr> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; line-height: 17px; font-size: 12px; color:#8592A6;"> Copyright © 1999-2021 Trip.com 版權所有 </td> 
        </tr> 
        <tr> 
         <td style="font-family:'helvetica', 'Arial', sans-serif; line-height: 17px; font-size: 12px; color:#8592A6;"> 使用 Trip.com 網站即代表閣下同意 Trip.com 的 <a href="https://pages.trip.com/service-guideline/privacy-policy-zh-hk.html" style="font-family:'Arial', sans-serif; line-height:   11px; font-size: 11px; color:#455873; cursor: pointer;">私隱條款</a>。 </td> 
        </tr> 
        <tr> 
         <td height="60"></td> 
        </tr> 
        <!-- 底部模块 --> 
       </tbody>
      </table> </td> 
     <td width="16"></td> 
    </tr> 
   </tbody> 
  </table> 
  <!-- footer end --> 
  <div style="display:none">
   <img src="http://m.fat.ctripqa.com/restapi/soa2/13382/markOpenEmail?uuid=1dd8b70c-a7a1-44ed-a1bd-65a4b51a0fa3&amp;email=&amp;templateId=">
  </div>
 
</div>
  
  <div contenteditable="true" class="__editable" style="color: red;font-size: 30px;">
    <div>
      <b>可编辑内容2</b>
    </div>
  </div>
  
  <div contenteditable="true" data-add="t132">
    <p style="color: red">可编辑内容3</p>
  </div>

  <img src="https://via.placeholder.com/1000x300/02c7cd/fff?text=Placeholder%20image" alt="CKEditor 5 rocks!">

  <p>Simple image:</p>
  <figure class="image">
        <img src="https://via.placeholder.com/1000x300/02c7cd/fff?text=Placeholder%20image" alt="CKEditor 5 rocks!">
  </figure>
	
	<p>This is a simple box:</p>
    <section class="simple-box" style="color: blue">
        <h1 class="simple-box-title">Box title</h1>
        <div class="simple-box-description" style="color: green">
            <p>The description goes here.</p>
            <ul>
                <li>It can contain lists,</li>
                <li>and other block elements like headings.</li>
            </ul>
        </div>
    </section>
	`);
	const editorRef = useRef(null);
	const [editorConfig, setEditorConfig] = useState({
    // extraPlugins: [attrExtraPlugin],
    extraPlugins: [CustomFigureAttributes],
		plugins: [
			// A set of editor features to be enabled and made available to the user.
			Essentials, Heading, Bold, Italic, Underline,
			Link, Image, Paragraph, Table, TableToolbar,
      InsertImagePlugin, simplebox, editableDiv,
      attrPlugin,
      imageAttrPlugin,
      tableAttrPlugin,
      //
			// // Your custom plugin implementing the widget is loaded here.
			// ProductPreviewEditing
		],
		toolbar: [
			'heading',
			'|',
			'bold', 'italic', 'underline',
			'|',
			'link', 'ImageToolbar', 'insertTable', 'insertImagePlugin', 'simplebox', 'editableDiv',
			'|',
			'undo', 'redo'
		],
    link: {
      decorators: {
        addGreenLink: {
          mode: 'automatic',
          callback: url => /^(https?:)?\/\//.test( url ), // 必须的
          attributes: {
            class: 'my-green-link'
          }
        }
      }
    },
    image: {
      resizeUnit: "%",
      resizeOptions: [ {
        name: 'resizeImage:original',
        value: null
      }],
    },
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
    allowedContent: true,
		// The configuration of the Products plugin. It specifies a function that will allow
		// the editor to render a React <ProductPreview> component inside a product widget.
		// products: {
		// 	productRenderer: ( id, domElement ) => {
		// 		const product = this.props.products.find( product => product.id === id );
		//
		// 		ReactDOM.render(
		// 			<ProductPreview id={id} {...product} />,
		// 			domElement
		// 		);
		// 	}
		// }
	});

	function handleEditorDataChange(e, editor) {
	  const data = editor.getData();
	  console.log('getData -> ', data);
		setEditorData(data);
	}

	function handleEditorReady(editor) {
		editorRef.current = editor;
    editor.editing.view.change( writer => {
      console.log('change -> ', );
      const viewEditableRoot = editor.editing.view.document.getRoot();
      writer.removeAttribute( 'class', viewEditableRoot );
    } );
		setEditorData(editor.getData());
		CKEditorInspector.attach( editor );
		window.ed = editor;
	}

	function pluginChange() {
    editorRef.current.destroy();
    setEditorConfig(
      {
        plugins: [
          // A set of editor features to be enabled and made available to the user.
          Essentials, Heading, Bold, Italic, Underline,
          //
          // // Your custom plugin implementing the widget is loaded here.
          // ProductPreviewEditing
        ],
        toolbar: [
          'heading',
        ],
      }
    )
  }

  useEffect(() => {
    window.ck = ClassicEditor
  }, []);

	return (
	  <div className="app__offer-editor" key="offer-editor">
			<h3>Product offer editor</h3>
			<CKEditor
				editor={ClassicEditor}
				data={editorData}
				config={editorConfig}
				onChange={handleEditorDataChange}
				onReady={handleEditorReady}
			/>

			<h3>Editor data</h3>
      <button onClick={pluginChange}>Change Plugin</button>
			<textarea value={editorData} readOnly={true}/>
		</div>
  );
}

export default App;
