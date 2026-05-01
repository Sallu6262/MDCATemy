const API_URL = import.meta.env.VITE_API_URL;

export const subjectFilter = async (isMistake, url, setURL, subject, setPageNumber, setTotalPages, setMcqs, total, setSubject, subjectNumber) => {
    const urlType = isMistake ? 'users/mistakes' : 'users/bookmarks';
    // url = url.replace(`${isMistake ? 'bookmarks' : 'mistakes'}`, `${isMistake ? 'mistakes' : 'bookmarks'}`);
    subject = subject.toLowerCase();
    url = `${API_URL}/${urlType}?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`;
    if(subject !== 'all'){
        url = `${API_URL}/${urlType}?page=1&biology=0&physics=0&chemistry=0&english=0&logical_reasoning=0`;
        url = url.replace(`${subject}=0`, `${subject}=1`);
    } 

    // console.log(url);
    
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    console.log(data);
    if(data.status === 'success'){
        setPageNumber(1);
        setTotalPages(Math.ceil(total[subject] / 10));
        setMcqs(data.data?.mcqs);
        setURL(url);
        setSubject(subjectNumber);
    }
} 

export const pageFilter = async (isMistake, url, setURL, isPageIncreased, pageNumber, setPageNumber, setMcqs) => {
    url = url.replace(`page=${pageNumber}`, `page=${isPageIncreased ? pageNumber + 1 : pageNumber - 1}`);

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    // console.log(url);
    if(data.status === 'success'){
        // console.log(data);
        setPageNumber(prev => isPageIncreased ? prev + 1 : prev - 1);
        setMcqs(data.data?.mcqs);
        setURL(url);
    }
}

export const searchFilter = async (isMistake, url, setURL, setPageNumber, setTotalPages, setMcqs, search) => {
    url += `&search=${search}`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    // console.log(url);
    if(data.status === 'success'){
        // console.log(data);
        setPageNumber(1);
        // setMcqs(data.data?.mcqs);
        // setURL(url);
    }
} 