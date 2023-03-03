const BASE_URL = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

const headers = { 'Content-Type': 'application/json' };

const options = {
    method: 'GET',
    headers: headers
}

 const get = async (keyword) => {
    const $param = {
        keyword,
    }
    
    const response = await fetch(`${BASE_URL}/languages?` + new URLSearchParams($param).toString(), options);
    
    if(response.ok) {
        return response.json();
    }

    throw new Error('서버 에러');
    
}

export default get;