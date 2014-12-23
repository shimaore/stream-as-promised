[Stream](http://nodejs.org/api/stream.html) as [Promise](https://github.com/petkaantonov/bluebird)(d)

    input = fs.createReadStream('/etc/passwd')
    output = fs.createWriteStream('/dev/null')
    input.pipe(output)

    stream_as_promised(input)
    .then(function(){
      console.log("Done reading.");
    })

    stream_as_promised(output)
    .then(function(){
      console.log("Done writing.");
    })

Install
=======

    npm install stream-as-promised
