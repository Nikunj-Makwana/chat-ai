function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let backgroundColor = '#';
    let foregroundColor = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        backgroundColor += `00${Math.floor((255 + value) / 2).toString(16)}`.slice(-2);
        foregroundColor += `00${Math.floor(value / 2).toString(16)}`.slice(-2);
    }

    const opacity = 0.5;
    backgroundColor += Math.floor(opacity * 255).toString(16);

    return { backgroundColor, foregroundColor };
}

export default function stringAvatar(name) {
    const { backgroundColor, foregroundColor } = stringToColor(name);
    const updateName = name?.toUpperCase()?.trim();

    let children = '';
    if (updateName) {
        const nameParts = updateName.split(' ');
        if (nameParts.length >= 2) {
            children = `${nameParts[0][0]}${nameParts[1][0] ? nameParts[1][0] : ''}`;
        } else {
            children = updateName.substring(0, 2);
        }
    }
    return {
        sx: {
            bgcolor: backgroundColor,
            color: foregroundColor,
            border: `2px solid ${foregroundColor}`,
        },
        children: children,
    };

}