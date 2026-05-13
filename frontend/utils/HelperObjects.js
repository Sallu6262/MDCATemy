export const subjectToColor = {
    'Biology' : '#10B981',
    'Physics' : '#A78BFA',
    'Chemistry' : '#38BDF8',
    'Logical Reasoning' : '#F59E0B',
    'English' : '#2DD4BF',
}

export const formatName = (name) => {
    return name.split('_').map(n => n[0].toUpperCase() + n.slice(1)).join(' ');
}