export const subjectToColor = {
    'Biology' : '#10B981',
    'Physics' : '#A78BFA',
    'Chemistry' : '#38BDF8',
    'Logical Reasoning' : '#F59E0B',
    'English' : '#2DD4BF',
}

export const formatName = (name) => {
    return name?.replaceAll('-','_')?.split('_')?.map(n => n?.[0]?.toUpperCase() + n?.slice(1))?.join(' ');
}

export const accuracyToTextColor = (accuracy) => {
    if(accuracy >= 75) return 'text-emerald-400 border-emerald-400';
    else if(accuracy >= 50 && accuracy <= 74) return 'text-amber-400 border-amber-400';
    return 'text-red-400 border-red-400';
}

export const clearLocalStorage = () => {
    localStorage.removeItem("exam");
    localStorage.removeItem("examTimer");
    localStorage.removeItem("reload");
    localStorage.removeItem("submitted");
    localStorage.removeItem("bookmarks");
    localStorage.removeItem("flagged");
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("correct");
    localStorage.removeItem("wrong");
}

export const scrollToComponent = (id, block) => {
    document.getElementById(id).scrollIntoView({behavior: 'smooth', block: block});
}