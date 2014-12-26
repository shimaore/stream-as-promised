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

The original stream is always available, so even though you cannot use the stream-as-promised as a replacment for the stream, you can still use it as storage for it:

    var w = stream_as_promised(fs.createWriteStream('/dev/null'))
    w
    .once('drain')
    .then(function(){
      w.stream.write(some_chunk);
    })

Install
=======

    npm install stream-as-promised
