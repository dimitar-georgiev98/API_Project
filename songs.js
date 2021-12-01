
const baseUrl = 'https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0';
const apiKey = '721af732bemshdad9a41d4833a88p1096cfjsn15bc63381c01';
const noPoster = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/No_music.svg/768px-No_music.svg.png';

let view = 'list';
let songs = [];

function getSongs(params = {}) {

    const data = {...params, 'rapidapi-key': apiKey}
    const route = 'charts/track';
    $.ajax({
        method: "GET",
        url: `${baseUrl}${route}`,
        data,
    })
    .done(response => {
        songs = response.tracks;
        createSongList();
    })
    .fail(response => {
        console.log(response);
    })
    .always(() => {
        console.log('ajax completed');
    })
}

function createSongList(){
    $songList = $('#song-list');
    $songList.empty();
    songs.forEach(song => {
        const $template = getSong(song);
        $songList.append($template);
    })
}

function getSong(song){
    const templateSelector = `#song-${view}-template`;
    const $template = $($(templateSelector).html());
    $template.find('.song-title').text(song.title);
    const image = song.share.image ? `${song.share.image}` : noPoster;
    $template.find('.song-image').attr('src', image);
    $template.find('.song-singers').text(song.subtitle);
    return $template;
}

function getSongByParam() {
    const sortBy = $('#filter-sort').val();
    const params = {sort_by: sortBy}
    return params;
}

$('#get-songs').click(()=> {
    getSongs(this.getSongByParam());
    alert("API doesn't support sort function!");
})

$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    createSongList();
})

$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    createSongList();
})

getSongs(this.getSongByParam());