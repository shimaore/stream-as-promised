[Stream](http://nodejs.org/api/stream.html) as [Promise](https://github.com/petkaantonov/bluebird)(d)

    input = fs.createReadStream('/etc/passwd')
    output = fs.createWriteStream('/dev/null')
    input.pipe(output)

These complete at the end of each stream:

    stream_as_promised(input)
    .then(function(){
      console.log("Done reading.");
    })

    stream_as_promised(output)
    .then(function(){
      console.log("Done writing.");
    })

One might also detect individual events on a stream:

    stream_as_promised(input)
    .once('end')
    .then(function(){
      console.log("Done reading.");
    })

Install
=======

    npm install stream-as-promised
