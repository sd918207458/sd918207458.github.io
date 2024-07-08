import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dialog from '../Dialog/index';

import found from '../../assets/picture/遊戲開始介面.png';
import Npc from '../../assets/志工阿姨1-常駐表情.png';
import button from '../../assets/picture/按鈕-遊戲開始.png'

import kids1 from '../../assets/picture/ming/圖檔-阿民/阿民1-一般常駐表情.png';
import kids2 from '../../assets/picture/ming/圖檔-阿民/阿民2-疑問.png';
import kids3 from '../../assets/picture/ming/圖檔-阿民/阿民3-認真.png';
import kids4 from '../../assets/picture/ming/圖檔-阿民/阿民3-認真2.png';
import kids5 from '../../assets/picture/ming/圖檔-阿民/阿民4-驚訝.png';
import kids6 from '../../assets/picture/ming/圖檔-阿民/阿民5-興奮.png';
import kids7 from '../../assets/picture/ming/圖檔-阿民/阿民6-驚慌緊張.png';
import kids8 from '../../assets/picture/ming/圖檔-阿民/阿民7-安慰.png';

import grandpa1 from '../../assets/picture/grandpa/阿公1-一般常駐表情.png';
import grandpa2 from '../../assets/picture/grandpa/阿公2-難過.png';
import grandpa3 from '../../assets/picture/grandpa/阿公3-驚訝.png';
import grandpa4 from '../../assets/picture/grandpa/阿公4-開心笑.png';
import grandpa5 from '../../assets/picture/grandpa/阿公5-驚慌緊張.png';
import grandpa6 from '../../assets/picture/grandpa/阿公6-嘆氣.png';

import frog1 from '../../assets/picture/Frog/郵差蛙蛙1-常駐表情.png';
import frog2 from '../../assets/picture/Frog/郵差蛙蛙2-疑問.png';
import frog3 from '../../assets/picture/Frog/郵差蛙蛙3-開心笑.png';


const Login = () => {
  // 使用 useState 來管理狀態
  const [dialogVisible, setDialogVisible] = useState(false); // 對話框是否可見
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0); // 當前對話框索引
  const [imageVisible, setImageVisible] = useState(false); // 圖片是否可見
  const [introVisible, setIntroVisible] = useState(false); // 前言是否可見
  const [specialMessageVisible, setSpecialMessageVisible] = useState(false); // 特殊消息是否可見

  const location = useLocation();

  // 保存頁面狀態到 sessionStorage
  const savePageState = () => {
    const pageState = {
      currentDialogIndex,
      imageVisible,
    };
    sessionStorage.setItem('loginPageState', JSON.stringify(pageState));
  };

  // 使用 useEffect 來管理組件掛載和卸載時的操作
  useEffect(() => {
    const savedState = JSON.parse(sessionStorage.getItem('loginPageState'));
    if (savedState) {
      setCurrentDialogIndex(savedState.currentDialogIndex);
      setImageVisible(savedState.imageVisible);
    }
    return () => {
      sessionStorage.removeItem('loginPageState');
    };
  }, []);

  useEffect(() => {
    if (location.state?.dialogIndex !== undefined) {
      setCurrentDialogIndex(location.state.dialogIndex);
      setDialogVisible(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (currentDialogIndex === 43) {
      setSpecialMessageVisible(true);
    } else {
      setSpecialMessageVisible(false);
    }
  }, [currentDialogIndex]);



  // 對話框數據
  const dialogs = [
    { title: '旁白', content: '有一天，阿民接到了活動中心志工的電話' },
    { title: '志工', content: '「唯？阿民阿，你阿公之前放在活動中心的東西，要記得過來拿喔！」', imageUrl: Npc },
    { title: '阿民', content: '「好的。我等等和阿公一起過去收拾。」', imageUrl: kids1 },
    { title: '阿民', content: '「阿公，我們去活動中心吧？」', imageUrl: kids1 },
    { title: '阿民', content: '「阿民，你們來了阿。爺爺的東西應該在那櫃子附近，你可以找找看。 」', imageUrl: Npc },
    { title: '阿民', content: '在櫃子附近找到一個舊箱子，裡面翻出了一台好破舊的相機和御守!', imageUrl: Npc },
    { title: '阿民', content: '「這是誰的相機呀？」', imageUrl: kids2 },
    { title: '阿公', content: '「這是你阿祖送給我的相機，那可是阿公的寶貝呢，可惜它現在壞掉了...」', imageUrl: grandpa2 },
    { title: '阿民', content: '「阿公，或許我們可以試著修好它，再一起拍下更多的照片。」', imageUrl: kids3 },
    { title: '旁白', content: '我們現在一起來幫阿公把相機修好吧!' },
    { title: '旁白', content: '把相機修好後，我們對著活動中心的牆上拍照測試看看，相機喀擦一聲...。' },
    { title: '阿民', content: '「阿公!這...這張照片...的活動中心...看起來跟現在不一樣诶?!」', imageUrl: kids5 },
    { title: '阿公', content: '「喔?這...是我還年輕的時候!活動中心的樣子诶!」', imageUrl: grandpa3 },
    { title: '阿公', content: '「你看在牆上畫水平線的男生就是我啊~」', imageUrl: grandpa4 },
    { title: '旁白', content: '阿民覺得不可思議，發現原來用這台相機對準特定的地方，會出現阿公以前的記憶。' },
    { title: '旁白', content: '這讓阿民的好奇心增加，想拿著這台相機到社區探險。' },
    { title: '阿民', content: '「阿公，我們可以一起去社區走走拍照嗎?」', imageUrl: kids1 },
    { title: '阿公', content: '「好啊」', imageUrl: grandpa4 },
    { title: '阿民', content: '「YA!走囉!出發去探險了喔!」', imageUrl: kids6 },
    //第二章：防空洞
    { title: '旁白', content: '剛走到附近，相機傳出了空襲警報的聲音。' },
    { title: '阿民', content: '「這是甚麼聲音?!」', imageUrl: kids7 },
    { title: '阿公', content: '「快！快到防空洞躲起來阿！」', imageUrl: grandpa5 },
    //解謎遊戲
    { title: '阿公', content: '「以前我們經常要躲在這裡，那時候二次世界大戰。」', imageUrl: grandpa6 },
    { title: '阿公', content: '「因為我們的這糖廠附近有酒精工廠，以提煉酒精充當替代燃料，經常成為美軍空襲的首要目標之一。」', imageUrl: grandpa6 },
    { title: '阿公', content: '「所以當時的我們一聽到空襲警報就要趕快躲到防空洞裡。」', imageUrl: grandpa6 },
    { title: '阿公', content: '「當時日本人還在這裡成立了『提新隊』專門教導我們遇到空襲應該怎麼做」', imageUrl: grandpa6 },
    { title: '阿民', content: '「阿公沒事了，我們現在很平安。」', imageUrl: kids8 },
    //第三章：糖廠
    { title: '相機', content: '「走到糖廠宿舍後，相機突然播放出了一段錄音...' },
    { title: '阿民', content: '「這是什麼聲音呀？」', imageUrl: kids2 },
    { title: '阿公', content: '「這聲音...好熟悉」', imageUrl: grandpa1 },
    { title: '阿民', content: '「這些聲音...都好像是關於糖廠和神社的聲音诶?」', imageUrl: kids5 },
    { title: '阿公', content: '「哈哈對啦! 這些聲音，都是我年輕時在糖廠工作的日子裡經常聽到的。」', imageUrl: grandpa4 },
    { title: '阿民', content: '「喔?那相機怎麼會撥放出這些錄音呢?」', imageUrl: kids2 },
    { title: '阿公', content: '「或許...可能想告訴我們什麼?」', imageUrl: grandpa1 },
    { title: '阿民', content: '「阿公，我們能不能找到糖廠的地圖，看看能不能根據這些聲音找到相關的地點？」', imageUrl: kids1 },
    { title: '阿公', content: '「好主意！我們去找找看。」', imageUrl: grandpa1 },
    { title: '旁白', content: '阿民拿起先前在活動中心找到了糖廠的地圖並仔細地查看。根據相機播放的聲音找到了相對應的地點，並發現到...' },
    //第四章：手水舍
    { title: '阿民', content: '「我們走到了手水舍旁後，並對著手水舍掃描拍照後才發現..」', imageUrl: kids1 },
    { title: '阿民', content: '「原來，手水舍是洗手台的意思啊」', imageUrl: kids1 },
    { title: '阿公', content: '「哈哈對阿，有趣吧~那是那個時代的念法。」', imageUrl: grandpa4 },
    { title: '阿公', content: '「以前在糖廠工作的時候啊，因為要搬運甘蔗過去，每次在大太陽底下運甘蔗吼，都滿身汗，我們就在這附近玩相撲，玩盡興了再到手水舍這邊洗澡。」', imageUrl: grandpa4 },
    //第五章：神社-三崁店社
    { title: '阿民', content: '「欸？這些照片⋯好像都有一隻小小的樹蛙」', imageUrl: kids2 },
    { title: '阿民', content: '「阿公，您知道祂們為什麼出現在照片裡面嗎？」', imageUrl: kids2 },
    { title: '阿公', content: '「那是樹蛙神，祂們在我年輕時就出現在我們的生活中了，我想它們可能有特別的意義。」', imageUrl: grandpa4 },
    { title: '阿民', content: '「樹蛙神？！聽起來很酷欸。阿公，我們能不能去找找看樹蛙神出現的地方呢？」', imageUrl: kids1 },
    { title: '阿公', content: '「我記得祂們經常出現在神社附近，或許我們可以去那裡看看。」阿民高興地說：「那我們現在就去神社吧！」', imageUrl: grandpa1 },
    { title: '阿民', content: '「阿公，就是那個樹蛙神！祂和照片上的樹蛙神長得一模一樣！」', imageUrl: kids6 },
    //解謎遊戲
    { title: '阿公', content: '「看來樹蛙神真的在保護我們，它們可能希望我們能到神社來，了解更多的故事。」', imageUrl: grandpa1 },
    { title: '阿民', content: '「阿公，神社裡有什麼故事或傳說嗎？」', imageUrl: kids2 },
    { title: '阿公', content: '「當然有，樹蛙神不只是神社的守護神，更是我們三民社區的守護神。祂們經常保護著我們的家鄉的這片土地。」', imageUrl: grandpa1 },
    { title: '阿公', content: '「我年輕時，每次面對困難或需要幫助時，我都會到神社來參拜，而樹蛙神總是會躲在附近給我力量和保護。」', imageUrl: grandpa1 },
    { title: '阿民', content: '「那樹蛙神是怎麼保護家鄉的呢？它們有什麼特別的能力嗎？」', imageUrl: kids2 },
    { title: '阿公', content: '「祂們就像是四葉幸運草一樣的角色，是家鄉的守護者。」', imageUrl: grandpa1 },
    { title: '阿公', content: '「如果你在困境中看到樹蛙神，那就是一個很好的象徵，它們會給予你力量和希望，讓你克服困難。」', imageUrl: grandpa1 },
    { title: '阿民', content: '「真的嗎？我也想遇到樹蛙神，我們能怎麼樣讓祂們出現呢？」', imageUrl: kids2 },
    { title: '阿公', content: '「只要我們心中真誠地希望，並且尊重這片土地和自然，樹蛙神就會出現在我們的生活中。」', imageUrl: grandpa4 },
    { title: '阿公', content: '「現在我們已經看到祂們在照片裡出現了，不過如果你真心地想要與祂們互動的話，可以經常到神社走走。」', imageUrl: grandpa4 },
    { title: '阿公', content: '「或是在家鄉的自然中與大自然共鳴，也許你會有機會遇到它們。」', imageUrl: grandpa4 },
    { title: '阿公', content: '「你知道嗎，以前神社前面有一間小郵局，我們經常在那裡寄信和收信。」', imageUrl: grandpa1 },
    { title: '阿民', content: '「郵局？」', imageUrl: kids2 },
    { title: '阿公', content: '「唉~對呀，不過前幾年，那小小的郵局被拆除了，就剩現在這片空地...」', imageUrl: grandpa6 },
    { title: '阿公', content: '「要是有好好保存這些建築及滴滴點點的回憶，該有多好...」', imageUrl: grandpa6 },
    { title: '旁白', content: '小樹蛙神好像聽見了這個心願，於是出現了許多小小樹蛙神。' },
    { title: '阿民', content: '「哇～怎麼突然出現好多小樹蛙神？而且每個樣子又有點不一樣欸？」', imageUrl: kids4 },
    { title: '阿公', content: '「或許這些樹蛙神想要帶領我們找回那些過去的回憶?」', imageUrl: grandpa3 },
    { title: '阿民', content: '「阿公，我們跟著小樹蛙神們去看看吧！」', imageUrl: kids6 },
    { title: '阿公', content: '「好啊。」', imageUrl: grandpa1 },
    { title: '旁白', content: '阿民跟著這些樹蛙神在神社前的空地上走著，發現每隻樹蛙神都有著獨特的特徵和表情。' },
    { title: '旁白', content: '他們循著這些樹蛙神的引導，漸漸走到郵局舊址的中心。' },
    //尋找郵差小小樹蛙神
    { title: '阿民', content: '「阿公，看那邊，那一定就是我們要找的郵差樹蛙神！」', imageUrl: kids6 },
    { title: '郵差小小樹蛙神', content: '「你們是來寄信的嗎？」', imageUrl: frog1 },
    { title: '阿民', content: '「樹蛙神⋯竟然會講話？!」', imageUrl: kids1 },
    { title: '郵差小小樹蛙神', content: '「呃⋯對。我會講話⋯啊你們是要來寄信的嗎？」', imageUrl: frog2 },
    { title: '阿民', content: '「不是欸⋯我們其實是因為這台相機拍的照片發現有小小樹蛙神然後知道神社這邊其實有郵局才意外找到你的⋯」', imageUrl: kids2 },
    { title: '郵差小小樹蛙神', content: '「喔？聽起來是一場很有趣的冒險⋯」', imageUrl: frog3 },
    { title: '郵差小小樹蛙神', content: '「不過竟然你們都這們認真找到我了，那我就幫你們滿足一個願望吧。你們有什麼心願嗎?」', imageUrl: frog3 },
    { title: '阿民', content: '「阿公，樹蛙神說他可以幫助我們實現一個願望诶！您想要許什麼願望呢?」', imageUrl: kids6 },
    { title: '阿公', content: '「在這裡度過這麼久的時光...許多事物早已物是人非...我想我的心願...應該是能在糖廠還在的時候，再來神社這邊看看，再到郵局這邊寄信吧...」', imageUrl: grandpa6 },
    { title: '阿公', content: '「可惜阿...早一看不見那心中最懷念的景色了...」', imageUrl: grandpa6 },
    { title: '阿民', content: '「阿公...雖然我們沒辦法回到那個年代去欣賞糖廠興盛的樣貌，不過我們可以在這地方拍張照片，我們的心中依然會留作美麗紀念，讓這個特別的時刻永遠保存下來。」', imageUrl: kids4 },
    { title: '旁白', content: '阿民與阿公站在郵差小樹蛙旁邊，阿公拿起相機，按下了快門。' },
    { title: '阿民', content: '「阿公，你看！照片上有您之前的去過的郵局跟神社欸。」', imageUrl: kids5 },
    { title: '阿公', content: '「真的是诶!這張照片真的很特別，感覺就像回到了過去。謝謝你們讓我找回這些美好時光。」', imageUrl: grandpa4 },
    { title: '郵差小樹蛙神', content: '「希望你們能夠永遠珍惜回憶，並一同守護這個家園。」', imageUrl: frog3 },
    { title: '照片', content: '「你要和我們一起守護這個家園嗎？」' },
    { title: '阿公', content: '「看來樹蛙神也想讓你參與這守護家鄉的使命，你怎麼想？」', imageUrl: grandpa4 },
    { title: '阿民', content: '「當然要啊!」', imageUrl: kids4 },
    { title: '阿民', content: '「阿公！我也想要守護這片美好的家園，讓它繼續充滿回憶和故事。」', imageUrl: kids4 },
    { title: '郵差小樹蛙神', content: '「很高興你願意加入我們，一起守護三民社區。」', imageUrl: frog3 },
    { title: '旁白', content: '最終，阿民和阿公以及郵差小樹蛙神一同站在神社前的空地上，他們的心充滿了對家園的熱愛和對未來的期待。' },
    { title: '旁白', content: '他們知道，即使時光流轉，家園的風景也許會改變，但那些珍貴的回憶和故事將永遠在心中留存。' },
    { title: '旁白', content: '阿民拿著照片，心中充滿感慨，他深深地明白到，守護家園不僅僅是保護土地，更是珍惜回憶、傳承文化的重要使命。' },
    { title: '旁白', content: '他決心要與阿公和樹蛙神一同努力，讓這片家園充滿愛和溫馨，成為屬於每個人心中的樂土。' },
    { title: '旁白', content: '故事的尾聲，他們一起走出了神社，展望著未來，準備迎接新的冒險和挑戰。' },
    { title: '旁白', content: '而在他們身後，樹蛙神們靜靜地守護著這片土地，為他們的使命默默地守護著家園的每一寸土地和每一份回憶。' },
    //此時介面會出現一句話「如果你是阿民你會怎麼守護三民社區?」然後會給幾的選項「#」「#」「#」。最後引導到社區正在推廣的活動。
  ];


  // 打開對話框
  const openDialog = () => {
    setIntroVisible(true); // 顯示前言
  };

  // 顯示對話框
  const showDialog = () => {
    setIntroVisible(false); // 隱藏前言
    setDialogVisible(true); // 顯示對話框
    setImageVisible(true);
    savePageState();
  };

  // 關閉對話框
  const closeDialog = () => {
    setDialogVisible(false);
    setCurrentDialogIndex(0);
    setImageVisible(false);
    savePageState();
  };

  // 處理上一個對話
  const handlePreviousDialog = () => {
    setCurrentDialogIndex((prevIndex) => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        savePageState();
        return newIndex;
      }
      return prevIndex;
    });
  };

  // 處理下一個對話
  const handleNextDialog = () => {
    setCurrentDialogIndex((prevIndex) => {
      if (prevIndex < dialogs.length - 1) {
        const newIndex = prevIndex + 1;
        savePageState();
        return newIndex;
      }
      return prevIndex;
    });
  };

  return (
    <div className='dialog'>
      {dialogVisible && (
        <Dialog
          visible={dialogVisible}
          onClose={closeDialog}
          dialogData={dialogs}
          currentIndex={currentDialogIndex}
          onPrevious={handlePreviousDialog}
          onNext={handleNextDialog}
          setCurrentDialogIndex={setCurrentDialogIndex}
          dialogs={dialogs}
          savePageState={savePageState}
        />
      )}
      {!dialogVisible && !introVisible && (
        <div className="centered-container">
          <img
            src={found}
            alt="Placeholder Image"
            className="centered-image"
          />
          <button type="button" onClick={openDialog} className="foundButton">
            <img
              src={button}
              alt="Start Button"
            />
          </button>
        </div>
      )}
      {introVisible && (
        <div className="intro-container">
          <p>你也對三崁店神社及社區背後那段不為人知的故事很好奇嗎？若隱若現的神秘樹蛙神默默地守護著什麼呢？

            跟隨著阿民和阿公腳步，透過舊相機每一次快門的聲音，追尋那一段段的片段記憶，而這不僅是一段尋找失落記憶的旅程、一次心靈的對話，更是一次世代間的交流。

            懷著對於過去記憶致敬的敬畏心，一同踏上一段穿越時空的魔幻旅程，一起探索屬於三崁店的甜蜜記憶及每一個角落，並一步步解開樹蛙神、三崁店神社及諸多社區遺跡背後的神秘故事吧！

            讓我們準備好，我們準備走進三崁店的神秘旅程囉！
          </p>
          <button onClick={showDialog}>走吧</button>
        </div>
      )}
      {specialMessageVisible && (
        <div className="special-message">
          想知道樹蛙為什麼總是出現在照片裡面嗎？
          7月31日我們將迎來三民憶旅的最後完整版~這將是一個更加完整、更具深度的體驗，讓我們一同體驗更多早期日本糖廠的生活吧!...待續
        </div>
      )}
    </div>
  );
};

export default Login;