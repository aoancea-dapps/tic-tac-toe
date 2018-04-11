$folder = '.\ipfs-storage'

Remove-Item $folder -Force -Recurse -ErrorAction Ignore

New-Item $folder -ItemType directory

Copy-Item -Path .\e2e -Destination $folder\e2e -Recurse
Copy-Item -Path .\src -Destination $folder\src -Recurse
Copy-Item -Path .\.angular-cli.json -Destination $folder\.angular-cli.json
Copy-Item -Path .\.editorconfig -Destination $folder\.editorconfig
Copy-Item -Path .\karma.conf.js -Destination $folder\karma.conf.js
Copy-Item -Path .\package.json -Destination $folder\package.json
Copy-Item -Path .\protractor.conf.js -Destination $folder\protractor.conf.js
Copy-Item -Path .\tsconfig.json -Destination $folder\tsconfig.json
Copy-Item -Path .\tslint.json -Destination $folder\tslint.json


#$command = 'cd {0}' -f $folder

Invoke-Expression ('ipfs add -r {0}' -f $folder)
#iex 'ipfs add -r .'
#iex 'cd ..'