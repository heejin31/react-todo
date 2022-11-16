import { useContext, createContext, useState, useEffect } from "react";

const DarkModeContext = createContext(); //아래 훅을 만들었기 때문에 export필요 X

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); //setDarkMode(!darkMode); //setDarkMode((mode) => !mode)의 축약형
    updateDarkMode(!darkMode);
  };

  //https://tailwindcss.com > docs > dark-mode 중간에 있는 상태유지 부분에서 복사
  //제일 처음에 마운트(로딩)될때 최종상태가 다크모드인지 아닌지 판단하고 그대로 초기값 설정 (그전 상태 그대로 달과 해가 보임:원래는 달이 기본이었음)
  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    //다크모드상태를 변수 isDark에 넣어줌
    setDarkMode(isDark); //다크모드인지 아닌지 내부상태 업데이트
    updateDarkMode(isDark);
  }, []); //처음 로딩될때만 작동함

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//Hooks 생성
export const useDarkMode = () => useContext(DarkModeContext);

//다크모드가 트루였을때 제일 상위 엘리먼트에 dark 클라스를 넣어준다
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark"; //업데이트 될때마다 로컬 스토리지에 저장
  } else {
    document.documentElement.classList.remove("dark"); //다크가 없어질때는 로컬 스토리지에 light 저장
    localStorage.theme = "light";
  }
}
