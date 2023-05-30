

export const fileUpload = async(file) => {

    const cloudUrl = '';

    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('cant upload image');

        const cloudResp = await resp.json();

        return cloudResp;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}